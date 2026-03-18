import {Gender} from '../Gender';
import {Role} from '../Role';

export class SignupUserModel {
  address: string = "";
  name: string = "";
  dateOfBirth: string | Date = new Date();
  email: string = "";
  phone: string = "";
  password: string = "";
  confirmPassword: string = "";
  gender:   Gender = Gender.Male;
  role?: Role = Role.User;
  image: string = "";
}
