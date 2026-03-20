import { EventCreateInput, EventUpdateInput } from "../../../generated/prisma/models";
import {EventDto, toEventDto} from "../../dto/event.dto";
import { ResponseMessage } from "../../utils/responseMessage.util";
import {IEventService} from "./IEventService";
import {prisma} from "../../db/prisma";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

class EventService implements IEventService {
    async createEvent(request: EventCreateInput): Promise<EventDto> {
      //----> Insert the new event in the database.
      const newEvent = await prisma.event.create({data: request});

      //----> Return the response message.
      return toEventDto(newEvent)
    }

    async deleteEventById(id: string): Promise<EventDto> {
        //----> Check if the event exists.
        await this.getOneEvent(id);

        //----> Delete the event.
        const deletedEvent = await prisma.event.delete({where: {id}});

        //----> Return the response message.
        return toEventDto(deletedEvent)
    }

    async editEventById(id: string, request: EventUpdateInput): Promise<EventDto> {
        //----> Check if the event exists.
       await this.getOneEvent(id);

       //----> Update the event.
       const editedEvent = await prisma.event.update({where: {id}, data: request});

       //----> Return the response message.
       return toEventDto(editedEvent)
    }

    async getEventById(id: string): Promise<EventDto> {
      //----> Get the event by id.
      const event = await this.getOneEvent(id);

      //----> Send back response.
      return toEventDto(event);
    }

    async getEvents(): Promise<EventDto[]> {
      //----> Get all events.
      const events = await prisma.event.findMany();

      //----> Send back response.
      return events.map(toEventDto);


    }

    private async getOneEvent(id: string){
      //----> Get the event by id.
      const event = await prisma.event.findUnique({where: {id}});

      //----> If the event does not exist, throw an error.
      if(!event) throw catchError(StatusCodes.NOT_FOUND, "Event not found in db!");

      //----> Return the event.
      return event;
    }

}

export const eventService = new EventService();
