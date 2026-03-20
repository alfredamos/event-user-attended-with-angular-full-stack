import {Component, inject, OnInit} from "@angular/core";
import {EventsTable} from "../../components/events/events-table/events-table";
import {EventService} from "../../services/event-service";
import {EventDb} from "../../services/event-db";
import {RouteMeta} from "@analogjs/router";
import {adminGuard} from "../../guards/adminGuard.guard";
import {authGuard} from "../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-events-page',
  imports: [EventsTable],
  template: `
    <app-events-table [events]="eventService.events()" ></app-events-table>
  `,
})
export default class EventsPage implements OnInit{
  eventDb = inject(EventDb);
  eventService = inject(EventService);

  ngOnInit(): void {
    this.eventDb.getEvents().then(() => {
    }).catch(console.error);
  }
}
