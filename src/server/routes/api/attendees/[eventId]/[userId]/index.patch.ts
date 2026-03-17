import {createError, defineEventHandler, getRouterParam, readBody, readValidatedBody} from "h3";
import catchError, {HttpError} from "http-errors";
import {attendeeService} from "../../../../../services/attendees/AttendeeService";
import {authService} from "../../../../../services/auth/AuthService";
import {StatusCodes} from "http-status-codes";
import {attendeeEditSchema} from "../../../../../validations/attendee.validation";

export default defineEventHandler(async (event) => {
  try {
    //----> Get the attendee payload from the request body.
    const attendeePayload = await readValidatedBody(event, attendeeEditSchema.parse);

    //----> Get the event id and user id from the router param.
    const eventId = getRouterParam(event, 'eventId') as string;
    const userId = getRouterParam(event, 'userId') as string;

    //----> Get user session.
    const session = authService.getUserSession(event);

    //----> Only admin and owner can edit attendee.
    if (!session.isAdmin && (session.id.normalize() !== userId.normalize())) throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to fetch this attendee.");

    //----> Fetch the attendee.
    return attendeeService.editAttendeeById(eventId, userId, attendeePayload);

  }catch (error) {
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }
})
