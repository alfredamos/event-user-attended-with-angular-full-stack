import {fromUserToUserDto, UserDto} from "../../dto/user.dto";
import { ResponseMessage } from "../../utils/responseMessage.util";
import {IUserService} from "./IUserService";
import {prisma} from "../../db/prisma";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

class UserService implements IUserService {
    async deleteUserById(id: string): Promise<UserDto> {
      //----> Check if the user exists.
      await this.getOneUser(id);

      //----> Delete the user.
      const deletedUser = await prisma.user.delete({where: {id}});

      //----> Return the response message.
      return fromUserToUserDto(deletedUser);
    }

    async getAllUsers(): Promise<UserDto[]> {
      //----> Fetch all users from the database.
      const users = await prisma.user.findMany();

      //----> Return the users.
      return users.map(fromUserToUserDto);
    }

    async getUserById(id: string): Promise<UserDto> {
      //----> Fetch user from the database.
      const user = await this.getOneUser(id);

      //----> Send back response.
      return fromUserToUserDto(user);
    }

    private async getOneUser(id: string){
      //----> Fetch user from the database.
      const user = await prisma.user.findUnique({where: {id}});

      //----> If a user does not exist, throw an error.
      if(!user) throw catchError(StatusCodes.NOT_FOUND, "User not found in db!");

      //----> Return the user.
      return user;
    }

}

export const userService = new UserService();
