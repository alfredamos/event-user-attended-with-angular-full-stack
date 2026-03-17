import {createError, defineEventHandler, getRouterParam} from "h3";
import {authService} from "../../../../../services/auth/AuthService";
import catchError, {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";
import {attendeeService} from "../../../../../services/attendees/AttendeeService";

export default defineEventHandler(async (event) => {
  try {
    //----> Get the event id and user id from the router param.
    const eventId = getRouterParam(event, 'eventId') as string;
    const userId = getRouterParam(event, 'userId') as string;

    //----> Get the user session.
    const session = authService.getUserSession(event);

    //----> Only admin and owner can delete attendee.
    if (!session.isAdmin && (session.id.normalize() !== userId.normalize())) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to delete this attendee.")

    //----> Delete the attendee from the db and send back a response.
    return attendeeService.deleteAttendeeById(eventId, userId);

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }
})
