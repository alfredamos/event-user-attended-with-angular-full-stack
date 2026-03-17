import {
  ChangeUserPassword,
  ChangeUserRole,
  EditUserProfile,
  LoginUser,
  SignupUser
} from "../../validations/auth.validation";
import {ResponseMessage} from "../../utils/responseMessage.util";
import {UserDto} from "../../dto/user.dto";
import {H3Event} from "h3";
import {Session} from "../../models/session.model";

export interface IAuthService {
  changeUserPassword(request: ChangeUserPassword): Promise<ResponseMessage>;
  changeUserRole(request: ChangeUserRole, event: H3Event): Promise<ResponseMessage>;
  editUserProfile(request: EditUserProfile): Promise<ResponseMessage>;
  getCurrentUser(event: H3Event): Promise<UserDto>;
  loginUser(request: LoginUser, event: H3Event): Promise<Session>;
  logoutUser(event: H3Event): Promise<Session>;
  refreshUserToken(event: H3Event): Promise<Session>;
  signupUser(request: SignupUser): Promise<ResponseMessage>;
}
