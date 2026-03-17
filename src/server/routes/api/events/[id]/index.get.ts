import {defineEventHandler, getRouterParam} from "h3";
import {eventService} from "../../../../services/events/EventService";

export default defineEventHandler(async (event) => {
  //----> Get the id from the router param.
  const id = getRouterParam(event, 'id') as string;

  //----> Get the event from the db and send back a response.
  return await eventService.getEventById(id);
})
