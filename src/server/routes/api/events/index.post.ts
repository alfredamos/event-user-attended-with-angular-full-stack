import {createError, defineEventHandler, getRouterParam, readBody, readValidatedBody} from "h3";
import {eventCreateSchema} from "../../../validations/event.validation";
import {eventService} from "../../../services/events/EventService";
import {authService} from "../../../services/auth/AuthService";
import catchError, {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
  try{
    //----> Get the user session.
    const session = authService.getUserSession(event);

    //----> Must be an admin to create an event.
    if (!session.isAdmin) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to delete an event.")

    //----> Get the event payload from the request body.
    const eventPayload = await readValidatedBody(event, eventCreateSchema.parse);

    //----> Create the event in the db and send back a response.
    return await eventService.createEvent(eventPayload);

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }

})
