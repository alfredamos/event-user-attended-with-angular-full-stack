import {createError, defineEventHandler, getRouterParam} from "h3";
import {authService} from "../../../../services/auth/AuthService";
import catchError, {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";
import {userService} from "../../../../services/users/UserService";

export default defineEventHandler(async (event) => {
  try {
    //----> Get the user session.
    const session = authService.getUserSession(event);

    //----> Get the id from the router param.
    const id = getRouterParam(event, 'id') as string;

    //----> Must be an admin or owner to fetch a user.
    if (!session.isAdmin && (session.id !== id)) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to delete an event.")

    //----> Fetch the user from the db and send back a response.
    return await userService.getUserById(id);
  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }
})
