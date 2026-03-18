import {createError, defineEventHandler} from "h3";
import {userService} from "../../../services/users/UserService";
import catchError, {HttpError} from "http-errors";
import {authService} from "../../../services/auth/AuthService";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  try {
    //----> Get user session.
    const session = authService.getUserSession(event);
    if(!session.isAdmin) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to perform this action.");

    //----> Get all users from the db and send back a response.
    return await userService.getAllUsers();

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }

})
