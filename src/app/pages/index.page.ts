import {Component, inject} from '@angular/core';
import {EventListCards} from "../components/event-list-cards/event-list-cards";
import {AuthService} from "../services/auth-service";
import {EventDb} from "../services/event-db";
import {EventModel} from "../models/event.model";
import {AttendeeCreate} from "../../server/validations/attendee.validation";
import {AttendeeDb} from "../services/attendee-db";
import {Router} from "@angular/router";
import {httpResource} from "@angular/common/http";

@Component({
  selector: 'app-home',
  imports: [EventListCards],
  template: `
    <app-event-list-cards
      [events]="events.value()"
      [isLoggedIn]="authService.isLoggedIn()"
      (onAddAttendee)="addAttendee($event)"
    >

    </app-event-list-cards>/
  `,
  standalone: true
})
export default class Home{
  attendeeDb = inject(AttendeeDb);
  authService = inject(AuthService)
  router = inject(Router);

  events = httpResource<EventModel[]>(() => "/events", {
    defaultValue: []
  })

  async addAttendee (event: EventModel){
    const userId = this.authService.userCurrent()?.id;
    const newAttendee: AttendeeCreate = {
      eventId: event.id,
      userId
    }

    //----> Create a new attendee.
    await this.attendeeDb.createAttendee(newAttendee);

    await this.router.navigate([this.authService.isAdmin() ? "/attendees" : `/attendees/by-user-id/${userId}`]);

  }

}
