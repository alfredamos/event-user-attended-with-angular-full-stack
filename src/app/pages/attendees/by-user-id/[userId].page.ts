import {Component, inject, input, OnInit} from "@angular/core";
import {AttendeeDb} from "../../../services/attendee-db";
import {AttendeeService} from "../../../services/attendee-service";
import {AttendeesTable} from "../../../components/attendees/attendees-table/attendees-table";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-attendees-by-user-id-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendeeService.attendees()" ></app-attendees-table>
  `,
})
export default class AttendeesByUserIdPage implements OnInit{
  userId = input.required<string>();
  attendeeDb = inject(AttendeeDb);
  attendeeService = inject(AttendeeService);


  async ngOnInit() {
    this.attendeeDb.getAttendeesByUserId(this.userId()).then((attendee) => {console.log(attendee)}).catch((error) => {console.error(error)})
  }
}
