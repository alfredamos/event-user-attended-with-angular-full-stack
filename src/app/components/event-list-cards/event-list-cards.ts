import {Component, input, output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EventModel} from "../../models/event.model";

@Component({
  selector: 'app-event-list-cards',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './event-list-cards.html',
  styleUrl: './event-list-cards.css',
})
export class EventListCards {
  events = input.required<any[]>();
  isLoggedIn = input.required<boolean>();

  onAddAttendee = output<EventModel>();

  addAttendee(event: EventModel) {
    this.onAddAttendee.emit(event);
  }
}
