import { EventCreateInput, EventUpdateInput } from "../../../generated/prisma/models";
import {EventDto, toEventDto} from "../../dto/event.dto";
import { ResponseMessage } from "../../utils/responseMessage.util";
import {IEventService} from "./IEventService";
import {prisma} from "../../db/prisma";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

class EventService implements IEventService {
    async createEvent(request: EventCreateInput): Promise<ResponseMessage> {
      //----> Insert the new event in the database.
      await prisma.event.create({data: request});

      //----> Return the response message.
      return new ResponseMessage("Event created successfully", "success", StatusCodes.CREATED);
    }

    async deleteEventById(id: string): Promise<ResponseMessage> {
        //----> Check if the event exists.
        await this.getOneEvent(id);

        //----> Delete the event.
        await prisma.event.delete({where: {id}});

        //----> Return the response message.
        return new ResponseMessage("Event deleted successfully", "success", StatusCodes.OK);
    }

    async editEventById(id: string, request: EventUpdateInput): Promise<ResponseMessage> {
        //----> Check if the event exists.
       await this.getOneEvent(id);

       //----> Update the event.
       await prisma.event.update({where: {id}, data: request});

       //----> Return the response message.
       return new ResponseMessage("Event updated successfully", "success", StatusCodes.OK);
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
