import {getCookie, H3Event, setCookie} from "h3";
import {fromUserToUserDto, UserDto} from "../../dto/user.dto";
import {Session} from "../../models/session.model";
import {ResponseMessage} from "../../utils/responseMessage.util";
import {
  ChangeUserPassword,
  ChangeUserRole,
  EditUserProfile,
  LoginUser,
  SignupUser
} from "../../validations/auth.validation";
import {IAuthService} from "./IAuthService";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {prisma} from "../../db/prisma";
import {fromEditUserToUser} from "../../dto/fromEditUserToUser.dto";
import {fromSignupUserToUser} from "../../dto/fromSignupUserToUser";
import {TokenJwt} from "../../models/TokenJwt.model";
import {JwtPayload} from "../../models/JwtPayload";
import {Role, TokenType} from "../../../generated/prisma/enums";
import {AuthParam} from "../../utils/authParam.util";
import {emptySession} from "../../utils/emptySession";
import {emptyTokenJwt} from "../../utils/emptyTokenJwt";
import {User} from "../../../generated/prisma/client";
import {tokenService} from "../token/TokenService";
import {TokenUncheckedCreateInput} from "../../../generated/prisma/models/Token";


export class AuthService implements IAuthService {
    async changeUserPassword(request: ChangeUserPassword): Promise<ResponseMessage> {
      //----> Check password match.
      if (this.passwordNotMatch(request.newPassword, request.confirmPassword)){
        throw catchError(StatusCodes.BAD_REQUEST, "Passwords do not match");
      }

      //----> Check for existence of user.
      const user = await this.getUserByEmail(request.email);

      //----> Check for valid password.
      if (await this.passwordNotValid(request.password, user.password)){
        throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
      }

      //----> Hash new password.
      const hashedPassword = await bcrypt.hash(request.newPassword, 12);

      //----> Update user password.
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          ...user, password: hashedPassword
        }
      });

      //----> Return success message.
      return new ResponseMessage("Password changed successfully", "success", StatusCodes.OK);

    }

    async changeUserRole(request: ChangeUserRole, event: H3Event): Promise<ResponseMessage> {
        //----> Get the user session.
      const session = this.getUserSession(event);

      //----> Check for admin role.
      if (session.role !== Role.Admin){
        throw catchError(StatusCodes.FORBIDDEN, "You are not authorized to perform this action");
      }

      //----> Check for existence of user.
      const user = await this.getUserByEmail(request.email);

      //----> Change user role.
      const userRole = user.role === Role.User ? Role.Admin : Role.User;

      //----> Update user role.
      await prisma.user.update({where: {email: request.email}, data: {...user, role: userRole}});

      //----> Return success message.
      return new ResponseMessage("User role changed successfully", "success", StatusCodes.OK);
    }

    async editUserProfile(request: EditUserProfile): Promise<ResponseMessage> {
        //----> Check for existence of user.
        const user = await this.getUserByEmail(request.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(request.password, user.password)){
          throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }

        //----> Get user from edit-user-profile request and update user.
        request.password = user.password;
        const userToEdit = fromEditUserToUser(request, user.id);
        await prisma.user.update({where: {id: user.id}, data: userToEdit});

        //----> Return success message.
        return new ResponseMessage("Profile updated successfully", "success", StatusCodes.OK);

    }

    async getCurrentUser(event: H3Event): Promise<UserDto> {
        //----> Get the user session.
      const session = this.getUserSession(event);

      //----> Check for null session.
      if (!session) {
        return new UserDto();
      }

      //----> Fetch user by email.
      const user = await this.getUserByEmail(session.email);

      //----> Send back response.
      return fromUserToUserDto(user);
    }

    async loginUser(request: LoginUser, event: H3Event): Promise<Session> {
      //----> Check for existence of user.
      const user = await this.getUserByEmail(request.email);

      //----> Check for valid password.
      if (await this.passwordNotValid(request.password, user.password)){
        throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
      }

      //----> From user to token-jwt.
      const tokenJwt = this.fromUserToTokenJwt(user);

      //----> Generate tokens and cookies.
      return await this.generateTokensAndCookies(tokenJwt, event);
    }

    async logoutUser(event: H3Event): Promise<Session> {
      //----> Delete access-token and refresh cookies.
      this.deleteCookie(event, AuthParam.accessTokenName, AuthParam.accessTokenPath);
      this.deleteCookie(event, AuthParam.refreshTokenName, AuthParam.refreshTokenPath);

      //----> Get user session.
      const session = this.getUserSession(event);

      //----> Check for null session.
      if(!session){
        return emptySession
      }

      //----> Revoke all valid token objects.
      await tokenService.revokeValidTokensByUserId(session.id);

      //----> Send back response.
      return emptySession;
    }

    async refreshUserToken(event: H3Event): Promise<Session> {
      //----> Get the user refresh-token.
      const refreshToken = getCookie(event, AuthParam.refreshTokenName);

      //----> Check for empty refresh-token.
      if (!refreshToken){
        return emptySession;
      }

      //----> Validate refresh-token.
      const tokenJwt = this.validateToken(refreshToken);

      //----> Generate tokens and cookies.
      return await this.generateTokensAndCookies(tokenJwt, event);

    }

    async signupUser(request: SignupUser): Promise<ResponseMessage> {
      //----> Check for existing user.
      const existingUser = await prisma.user.findUnique({where: {email: request.email}});
      if (existingUser) {
        throw catchError(StatusCodes.BAD_REQUEST, "User already exists");
      }

      //----> Hash password.
      request.password = await bcrypt.hash(request.password, 12);

      //----> Create user.
      const newUser = fromSignupUserToUser(request);
      await prisma.user.create({data: {...newUser}});

      //----> Return success message.
      return new ResponseMessage("User created successfully", "success", StatusCodes.CREATED);
    }

    async generateTokensAndCookies(tokenJwt: TokenJwt, event: H3Event){
      //----> Revoke all valid token objects.
      await tokenService.revokeValidTokensByUserId(tokenJwt.id)

      //----> Generate access-token.
      const accessToken = this.generateToken(tokenJwt, AuthParam.accessTokenExpiresIn);
      this.makeCookie(event, AuthParam.accessTokenName, accessToken, AuthParam.accessTokenPath, AuthParam.accessTokenExpiresIn);

      //----> Generate refresh-token.
      const refreshToken = this.generateToken(tokenJwt, AuthParam.refreshTokenExpiresIn);
      this.makeCookie(event, AuthParam.refreshTokenName, refreshToken, AuthParam.refreshTokenPath, AuthParam.refreshTokenExpiresIn);

      //----> Store the token object in the db.
      const tokenObj = this.makeTokenObject(tokenJwt, accessToken, refreshToken);
      await tokenService.createToken(tokenObj);

      //----> Send back response.
      return this.toSession(tokenJwt, accessToken);
    }


    getUserSession(event: H3Event): Session {
      //----> Get the user access-token.
      const token = getCookie(event, AuthParam.accessTokenName);

      //----> Check for null token.
      if (!token) {
        return emptySession;
      }

      //----> Validate token.
      const tokenJwt = this.validateToken(token);

      //----> Check for null token-jwt.
      if (!tokenJwt){
        return emptySession;
      }

      //----> Send back response.
      return this.toSession(tokenJwt, token);
    }

    private passwordNotMatch(passwordOne: string, passwordTwo: string): boolean {
        return passwordOne.normalize() !== passwordTwo.normalize();
    }

    private async passwordNotValid(rawPassword: string, encodedPassword: string) {
        return ! await bcrypt.compare(rawPassword, encodedPassword);
    }

    private async getUserByEmail(email: string) {
      //----> Fetch user by email.
      const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

      //----> Check for null user.
      if (!user) {
        throw catchError(StatusCodes.NOT_FOUND, "User not found");
      }

      //----> Return user.
      return user;
    }

    private generateToken(tokenJwt:TokenJwt, expiresIn: number) {
      return jwt.sign(tokenJwt, process.env['JWT_TOKEN_KEY']!, {expiresIn: expiresIn});
    }

    private validateToken(token: string): TokenJwt {
      //----> Check for valid token.
      if (!token) {
        return emptyTokenJwt;
      }

      //----> Validate token.
      const jwtPayload = jwt.verify(token, process.env['JWT_TOKEN_KEY']!) as JwtPayload;

      //----> Check for null jwtPayload.
      if (!jwtPayload) {
        return emptyTokenJwt;
      }

      //----> Send back result.
      return this.fromJwtPayloadToTokenJwt(jwtPayload);
    }

    private fromJwtPayloadToTokenJwt(payload: JwtPayload): TokenJwt {
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
      }
    }

    private fromUserToTokenJwt(payload: User): TokenJwt {
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
      }
    }

    private toSession(tokenJwt: TokenJwt, token: string): Session {
      return {
        ...tokenJwt,
        accessToken: token,
        isAdmin: tokenJwt.role === Role.Admin,
        isLoggedIn: !!tokenJwt
      }
    }

    private deleteCookie(event: H3Event, cookieName: string, cookiePath: string) {
     this.makeCookie(event, cookieName, "", cookiePath, 0);
    }

    private makeCookie(event: H3Event, cookieName: string, cookieValue: string, CookiePath: string, maxAge: number) {
      setCookie(event, cookieName, cookieValue, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
        path: CookiePath,
        maxAge: maxAge
      })
    }

    private makeTokenObject(tokenJwt: TokenJwt, accessToken: string, refreshToken: string): TokenUncheckedCreateInput {
      return {
        accessToken,
        refreshToken,
        userId: tokenJwt.id,
        expired: false,
        revoked: false,
        tokenType: TokenType.Bearer

      }
    }

}

export const authService = new AuthService();
