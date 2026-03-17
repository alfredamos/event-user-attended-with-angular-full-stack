import {SignupUser} from "../validations/auth.validation";
import {Role} from "../../generated/prisma/enums";
import {UserCreateInput} from "../../generated/prisma/models/User";

export function fromSignupUserToUser(signupUser: SignupUser):UserCreateInput{
    return{
        name: signupUser.name,
        email: signupUser.email,
        phone: signupUser.phone,
        password: signupUser.password,
        role: Role.User,
        gender: signupUser.gender,
        image: signupUser.image,
    }
}
