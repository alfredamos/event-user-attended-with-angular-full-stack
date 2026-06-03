import {Component, inject, input, OnChanges, OnInit, signal, SimpleChanges} from "@angular/core";
import {AttendeeEditForm} from "../../../../components/attendees/attendee-edit-form/attendee-edit-form";
import {AttendeeResponse} from "../../../../../server/dto/attendeeRequest.dto";
import {AttendeeDb} from "../../../../services/attendee-db";
import {Router} from "@angular/router";
import {Attendee} from "../../../../models/Attendee";
import {AuthService} from "../../../../services/auth-service";
import {authGuard} from "../../../../guards/authGuard.guard";
import {RouteMeta} from "@analogjs/router";
import {isOwnerCheckByUserIdOrAdminGuard} from "../../../../guards/isOwnerCheckByUserIdOrAdminGuard.guard";
import {httpResource} from "@angular/common/http";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, isOwnerCheckByUserIdOrAdminGuard],
};

@Component({
  selector: 'app-edit-attendee-page-by-id',
  imports: [AttendeeEditForm],
  template: `
    <app-attendee-edit-form
      [attendee]="attendee.value()"
      (onAttendeeEdit)="editAttendee($event)"
      (onBackToList)="backToList()"
    >
    </app-attendee-edit-form>
  `,
})
export default class EditAttendeePageById{
  eventId  = input.required<string>();
  userId = input.required<string>();

  attendee = httpResource<AttendeeResponse>(() => `/attendees/${this.eventId}/${this.userId}`, {
    defaultValue: new AttendeeResponse()
  })

  attendeeDb = inject(AttendeeDb);
  authService = inject(AuthService);
  router = inject(Router);

  async editAttendee(attendee: Attendee) {
    await this.attendeeDb.editEventById(this.eventId(), this.userId(), attendee);
    await this.router.navigate([this.authService.isAdmin() ? '/attendees' : `/attendees/by-user-id/${this.userId()}`]);
  }

  async backToList() {
    await this.router.navigate([this.authService.isAdmin() ? '/attendees' : `/attendees/by-user-id/${this.userId()}`]);
  }
}
