import {Gender} from '../Gender';
import {Role} from '../Role';

export class SignupUserModel {
  name: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  confirmPassword: string = "";
  gender:   Gender = Gender.Male;
  role?: Role = Role.User;
  image: string = "";
}
