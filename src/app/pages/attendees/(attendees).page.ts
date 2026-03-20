import {Component, inject, OnInit} from "@angular/core";
import {AttendeesTable} from "../../components/attendees/attendees-table/attendees-table";
import {AttendeeService} from "../../services/attendee-service";
import {AttendeeDb} from "../../services/attendee-db";

@Component({
  selector: 'app-attendees-list-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendeeService.attendees()" ></app-attendees-table>
  `,
})
export default class AttendeesListPage implements OnInit{
  attendeeDb = inject(AttendeeDb);
  attendeeService = inject(AttendeeService);


  async ngOnInit() {
    this.attendeeDb.getAllAttendees().then((attendee) => {console.log(attendee)}).catch((error) => {console.error(error)})
  }
}
