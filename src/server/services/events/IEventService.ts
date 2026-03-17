import {EventCreateInput, EventUpdateInput} from "../../../generated/prisma/models/Event";
import {ResponseMessage} from "../../utils/responseMessage.util";
import {EventDto} from "../../dto/event.dto";

export interface IEventService{
  createEvent(request: EventCreateInput): Promise<ResponseMessage>;
  deleteEventById(id: string): Promise<ResponseMessage>;
  editEventById(id: string, request: EventUpdateInput): Promise<ResponseMessage>;
  getEventById(id: string): Promise<EventDto>;
  getEvents(): Promise<EventDto[]>;
}
