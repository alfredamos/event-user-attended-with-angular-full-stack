import {Component, input} from '@angular/core';
import {EventModel} from "../../../models/event.model";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-events-table',
  imports: [
    NgOptimizedImage,
    RouterLink,
    DatePipe
  ],
  templateUrl: './events-table.html',
  styleUrl: './events-table.css',
})
export class EventsTable {
  events = input.required<EventModel[]>()
}
