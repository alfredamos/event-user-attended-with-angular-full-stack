import {Role} from "../../generated/prisma/enums";

export class JwtPayload {
    id: string = "";
    email: string = "";
    name: string = "";
    role: Role = Role.NoUser;
    issueAt: number = 0;
    expiration: number = 0;
}
