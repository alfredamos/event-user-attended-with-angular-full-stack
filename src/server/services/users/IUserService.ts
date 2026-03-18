import {ResponseMessage} from "../../utils/responseMessage.util";
import {UserDto} from "../../dto/user.dto";

export interface IUserService {
  deleteUserById(id: string): Promise<ResponseMessage>;
  getAllUsers(): Promise<UserDto[]>;
  getUserById(id: string): Promise<UserDto>;
}
