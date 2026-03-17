import {Role} from "../../generated/prisma/enums";

export class Session {
    id: string = "";
    name: string = "";
    email: string = "";
    role: Role = Role.User;
    accessToken: string = "";
    isLoggedIn: boolean = false;
    isAdmin: boolean = false;
}