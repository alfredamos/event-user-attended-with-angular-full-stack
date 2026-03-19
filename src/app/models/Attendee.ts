import {Status} from "./Status";

export class Attendee {
  eventId: string = "";
  userId: string = "";
  status: string = Status.Attending;
}
