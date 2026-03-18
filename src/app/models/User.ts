import {Role} from "./Role";
import {Gender} from "./Gender";

export class User{
  id: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  gender:   Gender = Gender.Male;
  role: Role = Role.NonUser;
  image: string = "";
}
