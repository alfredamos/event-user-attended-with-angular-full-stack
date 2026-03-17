import {createError, defineEventHandler, getRouterParam} from "h3";
import {eventService} from "../../../../services/events/EventService";
import {HttpError} from "http-errors";
import {authService} from "../../../../services/auth/AuthService";
import {StatusCodes} from "http-status-codes";
import catchError from "http-errors";

export default defineEventHandler(async (event) => {
  try {
    //----> Get the user session.
    const session = authService.getUserSession(event);

    //----> Must be an admin to delete an event.
    if (!session.isAdmin) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to delete an event.")

    //----> Get the id from the router param.
    const id = getRouterParam(event, 'id') as string;

    //----> Delete the event from the db and send back a response.
    return await eventService.deleteEventById(id);
  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }

})
