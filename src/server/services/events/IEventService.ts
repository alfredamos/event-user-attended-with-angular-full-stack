import {EventCreateInput, EventUpdateInput} from "../../../generated/prisma/models/Event";
import {ResponseMessage} from "../../utils/responseMessage.util";
import {EventDto} from "../../dto/event.dto";

export interface IEventService{
  createEvent(request: EventCreateInput): Promise<EventDto>;
  deleteEventById(id: string): Promise<EventDto>;
  editEventById(id: string, request: EventUpdateInput): Promise<EventDto>;
  getEventById(id: string): Promise<EventDto>;
  getEvents(): Promise<EventDto[]>;
}
