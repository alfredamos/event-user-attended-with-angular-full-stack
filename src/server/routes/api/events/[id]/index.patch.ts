import {createError, defineEventHandler, getRouterParam, readBody, readValidatedBody} from "h3";
import {eventUpdateSchema} from "../../../../validations/event.validation";
import {eventService} from "../../../../services/events/EventService";
import catchError, {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";
import {authService} from "../../../../services/auth/AuthService";

export default defineEventHandler(async (event) => {
  try{
    //----> Get the user session.
    const session = authService.getUserSession(event);

    //----> Must be an admin to edit an event.
    if (!session.isAdmin) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to edit an event.")
    const id = getRouterParam(event, 'id') as string;

    //----> Get the event payload from the request body.
    const eventPayload = await readValidatedBody(event, eventUpdateSchema.parse);

    //----> Update the event in the db and send back a response.
    return await eventService.editEventById(id, eventPayload);

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }
})
