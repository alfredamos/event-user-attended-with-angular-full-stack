import {Role} from '../Role';

export class UserSession{
  id: string = "";
  accessToken: string = "";
  name: string = "";
  email: string = "";
  role: Role = Role.User;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
}
