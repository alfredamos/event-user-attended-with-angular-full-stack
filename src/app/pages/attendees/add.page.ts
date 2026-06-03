import {Component, inject, OnInit} from "@angular/core";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../guards/authGuard.guard";
import {adminGuard} from "../../guards/adminGuard.guard";
import {AttendeeCreateForm} from "../../components/attendees/attendee-create-form/attendee-create-form";
import {AttendeeCreate} from "../../../server/validations/attendee.validation";
import {Router} from "@angular/router";
import {httpResource} from "@angular/common/http";
import {EventModel} from "../../models/event.model";
import {User} from "../../models/User";
import {AttendeeDb} from "../../services/attendee-db";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-add-attendee-page',
  imports: [AttendeeCreateForm],
  template: `
    <app-attendee-create-form
      [users]="users.value()"
      [events]="events.value()"
      (onAttendeeCreate)="createAttendee($event)"
      (onBackToList)="backToList()"
    >
    </app-attendee-create-form>
  `,
})
export default class AddAttendeePage {
  attendeeDb = inject(AttendeeDb);
  router = inject(Router);

  events = httpResource<EventModel[]>(() => `/events`, {
    defaultValue: []
  });

  users = httpResource<User[]>(() => "/users", {
    defaultValue: []
  })

  async createAttendee(attendee: AttendeeCreate) {
    await this.attendeeDb.createAttendee(attendee);
    await this.router.navigate(['/attendees']);
  }

  async backToList() {
    await this.router.navigate(['/attendees']);
  }
}
