import {createError, defineEventHandler, readValidatedBody} from "h3";
import {changeUserPasswordSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth/AuthService";
import {HttpError} from "http-errors";

export default defineEventHandler(async (event) => {
  try {
   //----> Read validated body.
    const changeUserPassword = await readValidatedBody(event, changeUserPasswordSchema.parse);

    //----> Change the user password in db and return a success message.
    return await authService.changeUserPassword(changeUserPassword);
  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }

});
