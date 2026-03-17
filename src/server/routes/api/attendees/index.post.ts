import {createError, defineEventHandler, getRouterParam, readBody, readValidatedBody} from "h3";
import {authService} from "../../../services/auth/AuthService";
import catchError, {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";
import {attendeeService} from "../../../services/attendees/AttendeeService";
import {attendeeCreateSchema} from "../../../validations/attendee.validation";

export default defineEventHandler(async (event) => {
  try {
    //----> Get the attendee payload from the request body.
    const attendeePayload = await readValidatedBody(event, attendeeCreateSchema.parse);

    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Only admin.
    if (!session.isAdmin) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to fetch this attendee.");

    //----> Create new attendee.
    return attendeeService.createAttendee(attendeePayload);

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }
})
