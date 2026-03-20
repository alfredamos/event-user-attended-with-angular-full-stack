import {Component, input} from '@angular/core';
import {AttendeeResponse} from "../../../../server/dto/attendeeRequest.dto";
import {RouterLink} from "@angular/router";
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-attendees-table',
  imports: [
    RouterLink,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './attendees-table.html',
})
export class AttendeesTable {
  attendees = input.required<AttendeeResponse[]>();
}
