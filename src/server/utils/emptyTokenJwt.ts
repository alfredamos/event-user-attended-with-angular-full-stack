import {TokenJwt} from "../models/TokenJwt.model";
import {Role} from "../../generated/prisma/enums";

export const emptyTokenJwt: TokenJwt = {
    id: '',
    name: '',
    email: '',
    role: Role.NoUser
};
