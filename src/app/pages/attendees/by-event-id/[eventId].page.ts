import {Component, input} from "@angular/core";
import {AttendeesTable} from "../../../components/attendees/attendees-table/attendees-table";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../../guards/authGuard.guard";
import {adminGuard} from "../../../guards/adminGuard.guard";
import {httpResource} from "@angular/common/http";
import {AttendeeResponse} from "../../../../server/dto/attendeeRequest.dto";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-attendees-by-event-id-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendees.value()" ></app-attendees-table>
  `,
})
export default class AttendeesByEventIdPage{
  eventId = input.required<string>();

  attendees = httpResource<AttendeeResponse[]>(() => `/attendees/by-event-id/${this.eventId()}`, {
    defaultValue: []
  })
}
