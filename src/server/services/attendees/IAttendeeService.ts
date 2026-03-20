import {AttendeeUncheckedCreateInput, AttendeeUncheckedUpdateInput} from "../../../generated/prisma/models/Attendee";
import {AttendeeResponse} from "../../dto/attendeeRequest.dto";
import {ResponseMessage} from "../../utils/responseMessage.util";

export interface IAttendeeService {
  createAttendee(request: AttendeeUncheckedCreateInput): Promise<AttendeeResponse>;
  deleteAttendeeById(eventId: string, userId: string): Promise<AttendeeResponse>;
  editAttendeeById(eventId: string, userId: string, request: AttendeeUncheckedUpdateInput): Promise<AttendeeResponse>;
  getAllAttendees(): Promise<AttendeeResponse[]>;
  getAttendeeById(eventId: string, userId: string): Promise<AttendeeResponse>;
  getAttendeesByEventId(eventId: string): Promise<AttendeeResponse[]>;
  getAttendeesByStatus(status: string): Promise<AttendeeResponse[]>;
  getAttendeesByUserId(userId: string): Promise<AttendeeResponse[]>;

}
