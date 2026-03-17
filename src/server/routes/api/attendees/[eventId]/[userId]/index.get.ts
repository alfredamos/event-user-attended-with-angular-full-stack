import {createError, defineEventHandler, getRouterParam} from "h3";
import catchError, {HttpError} from "http-errors";
import {authService} from "../../../../../services/auth/AuthService";
import {StatusCodes} from "http-status-codes";
import {attendeeService} from "../../../../../services/attendees/AttendeeService";

export default defineEventHandler(async (event) => {
  try {
    //----> Get the event id and user id from the router param.
    const eventId = getRouterParam(event, 'eventId') as string;
    const userId = getRouterParam(event, 'userId') as string;

    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Only admin and owner can fetch attendee.
    if (!session.isAdmin && (session.id.normalize() !== userId.normalize())) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to fetch this attendee.");

    //----> Fetch the attendee.
    return attendeeService.getAttendeeById(eventId, userId);

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }
})
