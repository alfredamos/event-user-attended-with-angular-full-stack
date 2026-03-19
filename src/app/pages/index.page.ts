import {Component, inject, OnInit} from '@angular/core';
import {EventListCards} from "../components/event-list-cards/event-list-cards";
import {AuthService} from "../services/auth-service";
import {EventDb} from "../services/event-db";
import {EventService} from "../services/event-service";
import {EventModel} from "../models/event.model";
import {AttendeeCreate} from "../../server/validations/attendee.validation";
import {AttendeeDb} from "../services/attendee-db";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [EventListCards],
  template: `
    <app-event-list-cards
      [events]="eventService.events()"
      [isLoggedIn]="authService.isLoggedIn()"
      (onAddAttendee)="addAttendee($event)"
    >

    </app-event-list-cards>/
  `,
  standalone: true
})
export default class Home implements OnInit{
  attendeeDb = inject(AttendeeDb);
  authService = inject(AuthService)
  eventDb = inject(EventDb)
  eventService = inject(EventService);
  router = inject(Router);

  ngOnInit(): void {
    this.eventDb.getEvents().then(() => {
    }).catch(console.error);
  }

  async addAttendee (event: EventModel){
    const userId = this.authService.userCurrent()?.id;
    const newAttendee: AttendeeCreate = {
      eventId: event.id,
      userId
    }

    //----> Create a new attendee.
    await this.attendeeDb.createEvent(newAttendee);

    await this.router.navigate([this.authService.isAdmin() ? "/attendees" : `/attendees/by-user-id/${userId}`]);

  }

}
