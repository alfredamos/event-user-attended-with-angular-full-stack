import {EditUserProfile} from "../validations/auth.validation";
import {Role} from "../../generated/prisma/enums";
import {UserUncheckedUpdateInput} from "../../generated/prisma/models/User";

export function fromEditUserToUser(editUserProfile: EditUserProfile, id: string): UserUncheckedUpdateInput {

    return{
        id,
        name: editUserProfile.name,
        email: editUserProfile.email,
        phone: editUserProfile.phone,
        password: editUserProfile.password,
        role: editUserProfile.role as Role,
        gender: editUserProfile.gender,
        image: editUserProfile.image,
    }
}
