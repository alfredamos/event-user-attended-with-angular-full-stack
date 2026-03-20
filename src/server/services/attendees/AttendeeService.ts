import { AttendeeUncheckedCreateInput, AttendeeUncheckedUpdateInput } from "../../../generated/prisma/models";
import {AttendeeResponse, toAttendeeResponse} from "../../dto/attendeeRequest.dto";
import { ResponseMessage } from "../../utils/responseMessage.util";
import {IAttendeeService} from "./IAttendeeService";
import {prisma} from "../../db/prisma";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {Status} from "../../../generated/prisma/enums";

class AttendeeService implements IAttendeeService {
  async createAttendee(request: AttendeeUncheckedCreateInput): Promise<AttendeeResponse> {
    //----> Insert the new attendee in the db.
    const attendee = await prisma.attendee.create({data: request, include: {event: true, user: true}});

    //----> Send back response.
    return toAttendeeResponse(attendee);
  }

  async deleteAttendeeById(eventId: string, userId: string): Promise<AttendeeResponse> {
      //----> Check if the attendee exists.
      await this.getOneAttendee(eventId, userId);

      //----> Delete the attendee.
      const deletedAttendee = await prisma.attendee.delete({where: {eventId_userId: {eventId, userId}}, include: {event: true, user: true}});

      //----> Return the response message.
      return toAttendeeResponse(deletedAttendee)
  }

  async editAttendeeById(eventId: string, userId: string, request: AttendeeUncheckedUpdateInput): Promise<AttendeeResponse> {
    //----> Check for the existence of the attendee with event id and user id.
    await this.getOneAttendee(eventId, userId);

    //----> Update the attendee.
    const editedAttendee = await prisma.attendee.update({where: {eventId_userId: {eventId, userId}}, data: request, include: {event: true, user: true}});

    //----> Return the response message.
    return toAttendeeResponse(editedAttendee)
  }

  async getAllAttendees(): Promise<AttendeeResponse[]> {
    //----> Fetch all attendees.
    const attendees = await prisma.attendee.findMany({include: {event: true, user: true}});

    //----> Send back response.
    return attendees.map(toAttendeeResponse);
  }

  async getAttendeeById(eventId: string, userId: string): Promise<AttendeeResponse> {
    //----> Fetch an attendee with event id and user id.
    const attendee = await this.getOneAttendee(eventId, userId);

    //----> Send back response.
    return toAttendeeResponse(attendee)
  }

  async getAttendeesByEventId(eventId: string): Promise<AttendeeResponse[]> {
    //----> Fetch all attendees with event id.
    const attendees = await prisma.attendee.findMany({where: {eventId}, include: {event: true, user: true}});

    //----> Send back response.
    return attendees.map(toAttendeeResponse);
  }

  async getAttendeesByStatus(status: string): Promise<AttendeeResponse[]> {
    //----> Convert status to enum.
    const statusEnum = status as AttendeeUncheckedUpdateInput['status'] as Status;

    //----> Fetch attendees by status.
    const attendees = await prisma.attendee.findMany({where: {status: statusEnum}, include: {event: true, user: true}});

    //----> Send back response.
    return attendees.map(toAttendeeResponse);
  }

  async getAttendeesByUserId(userId: string): Promise<AttendeeResponse[]> {
    //----> Fetch all attendees with user id.
    const attendees = await prisma.attendee.findMany({where: {userId}, include: {event: true, user: true}});

    //----> Send back response.
    return attendees.map(toAttendeeResponse);

  }

  private async getOneAttendee(eventId: string, userId: string){
    //----> Fetch an attendee with event id and user id.
    const attendee = await prisma.attendee.findUnique({where: {eventId_userId: {eventId, userId}}, include: {event: true, user: true}});

    //----> If the attendee does not exist, throw an error.
    if(!attendee) throw catchError(StatusCodes.NOT_FOUND, "Attendee not found!");

    //----> Return the attendee.
    return attendee;
  }

}

export const attendeeService = new AttendeeService();
