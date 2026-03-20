import {Component, inject, input, OnInit} from "@angular/core";
import {AttendeesTable} from "../../../components/attendees/attendees-table/attendees-table";
import {AttendeeDb} from "../../../services/attendee-db";
import {AttendeeService} from "../../../services/attendee-service";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-attendees-by-event-id-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendeeService.attendees()" ></app-attendees-table>
  `,
})
export default class AttendeesByEventIdPage implements OnInit{
  eventId = input.required<string>();
  attendeeDb = inject(AttendeeDb);
  attendeeService = inject(AttendeeService);


  async ngOnInit() {
    this.attendeeDb.getAttendeesByEventId(this.eventId()).then((attendee) => {console.log(attendee)}).catch((error) => {console.error(error)})
  }
}
