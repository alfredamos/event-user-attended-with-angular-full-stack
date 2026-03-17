import {Gender, Role} from "../../generated/prisma/enums";
import {User} from "../../generated/prisma/client";


export class UserDto {
    id: string = "";
    name: string = "";
    email: string = "";
    phone: string = "";
    role: Role = Role.User;
    image: string = "";
    gender: Gender = Gender.Male;
}

export function fromUserToUserDto(user: User): UserDto {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image,
        gender: user.gender
    }
}
