import {Gender} from '../Gender';
import {Role} from '../Role';

export class EditUserProfileModel{
  address: string = "";
  dateOfBirth: string | Date = new Date();
  name: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  gender:   Gender = Gender.Male;
  role?  : Role = Role.User;
  image: string = "";
}
