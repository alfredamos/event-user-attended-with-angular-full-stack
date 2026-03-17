import {Role} from "../../generated/prisma/enums";
import {Session} from "../models/session.model";

export const emptySession : Session = {
    id: '',
    name: '',
    email: '',
    role: Role.NoUser,
    accessToken: '',
    isAdmin: false,
    isLoggedIn: false,
}
