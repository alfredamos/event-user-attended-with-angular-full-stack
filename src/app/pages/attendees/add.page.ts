import {Component, inject, OnInit} from "@angular/core";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../guards/authGuard.guard";
import {adminGuard} from "../../guards/adminGuard.guard";
import {AttendeeCreateForm} from "../../components/attendees/attendee-create-form/attendee-create-form";
import {AttendeeCreate} from "../../../server/validations/attendee.validation";
import {EventDb} from "../../services/event-db";
import {UserDb} from "../../services/user-db";
import {AttendeeDb} from "../../services/attendee-db";
import {EventService} from "../../services/event-service";
import {UserService} from "../../services/user-service";
import {Router} from "@angular/router";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-add-attendee-page',
  imports: [AttendeeCreateForm],
  template: `
    <app-attendee-create-form
      [users]="userService.users()"
      [events]="eventService.events()"
      (onAttendeeCreate)="createAttendee($event)"
      (onBackToList)="backToList()"
    >
    </app-attendee-create-form>
  `,
})
export default class AddAttendeePage implements OnInit{
  attendeeDb = inject(AttendeeDb);

  eventDb = inject(EventDb);
  eventService = inject(EventService);

  router = inject(Router);

  userDb = inject(UserDb);
  userService = inject(UserService);

  async ngOnInit() {
    this.eventDb.getEvents().then(console.log).catch(console.error);
    this.userDb.getUsers().then(console.log).catch(console.error);
  }

  async createAttendee(attendee: AttendeeCreate) {
    await this.attendeeDb.createAttendee(attendee);
    await this.router.navigate(['/attendees']);
  }

  async backToList() {
    await this.router.navigate(['/attendees']);
  }
}
