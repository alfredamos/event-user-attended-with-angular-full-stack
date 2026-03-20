import {UserDto} from "../../dto/user.dto";

export interface IUserService {
  deleteUserById(id: string): Promise<UserDto>;
  getAllUsers(): Promise<UserDto[]>;
  getUserById(id: string): Promise<UserDto>;
}
