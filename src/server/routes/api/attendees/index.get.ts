import {createError, defineEventHandler} from "h3";
import {authService} from "../../../services/auth/AuthService";
import catchError, {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";
import {attendeeService} from "../../../services/attendees/AttendeeService";

export default defineEventHandler(async (event) => {
  try {
    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Only admin.
    if (!session.isAdmin) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to fetch this attendee.");

    //----> Fetch the attendee.
    return attendeeService.getAllAttendees();

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }
})
