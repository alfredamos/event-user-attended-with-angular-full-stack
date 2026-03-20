import {Component, inject, input, OnInit} from "@angular/core";
import {AttendeeDb} from "../../../services/attendee-db";
import {AttendeeService} from "../../../services/attendee-service";
import {AttendeesTable} from "../../../components/attendees/attendees-table/attendees-table";
import {adminGuard} from "../../../guards/adminGuard.guard";
import {authGuard} from "../../../guards/authGuard.guard";
import {RouteMeta} from "@analogjs/router";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-attendees-by-status-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendeeService.attendees()" ></app-attendees-table>
  `,
})
export default class AttendeesByStatusPage implements OnInit{
  status = input.required<string>();
  attendeeDb = inject(AttendeeDb);
  attendeeService = inject(AttendeeService);


  async ngOnInit() {
    this.attendeeDb.getAttendeesByStatus(this.status()).then((attendee) => {console.log(attendee)}).catch((error) => {console.error(error)})
  }
}
