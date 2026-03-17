import {createError, defineEventHandler, getRouterParam} from "h3";
import {eventService} from "../../../services/events/EventService";
import {authService} from "../../../services/auth/AuthService";
import {HttpError} from "http-errors";

export default defineEventHandler(async (event) => {
  try {
    //----> Get all events from the db and send back a response.
    return await eventService.getEvents();

  }catch (error){
    const err = error as HttpError;
    throw createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    });
  }

})
