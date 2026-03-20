import {Component, inject, input, OnChanges, OnInit, signal, SimpleChanges} from "@angular/core";
import {AttendeeEditForm} from "../../../../components/attendees/attendee-edit-form/attendee-edit-form";
import {AttendeeService} from "../../../../services/attendee-service";
import {AttendeeResponse} from "../../../../../server/dto/attendeeRequest.dto";
import {AttendeeDb} from "../../../../services/attendee-db";
import {Router} from "@angular/router";
import {Attendee} from "../../../../models/Attendee";
import {AuthService} from "../../../../services/auth-service";
import {adminGuard} from "../../../../guards/adminGuard.guard";
import {authGuard} from "../../../../guards/authGuard.guard";
import {RouteMeta} from "@analogjs/router";
import {isOwnerCheckByUserIdOrAdminGuard} from "../../../../guards/isOwnerCheckByUserIdOrAdminGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, isOwnerCheckByUserIdOrAdminGuard],
};

@Component({
  selector: 'app-edit-attendee-page-by-id',
  imports: [AttendeeEditForm],
  template: `
    <app-attendee-edit-form
      [attendee]="attendee()"
      (onAttendeeEdit)="editAttendee($event)"
      (onBackToList)="backToList()"
    >
    </app-attendee-edit-form>
  `,
})
export default class EditAttendeePageById implements OnInit, OnChanges{
  eventId  = input.required<string>();
  userId = input.required<string>();

  attendee = signal<Attendee>(new Attendee)

  attendeeDb = inject(AttendeeDb);
  attendeeService = inject(AttendeeService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnChanges(_simpleChanges: SimpleChanges): void {
    this.loadAttendee();
  }

  ngOnInit(): void {
    this.loadAttendee();

  }

  loadAttendee() {
    const oneAttendee = this.attendeeService.findAttendeeById(this.eventId(), this.userId()) as unknown as AttendeeResponse;
    const attendee: Attendee = {eventId: this.eventId(), userId: this.userId(), status: oneAttendee.status};

    console.log("In attendee-edit, eventId : ", this.eventId());
    console.log("In attendee-edit, eventId : ", this.eventId());
    console.log("In attendee-edit, attendee : ", attendee);

    this.attendee.set(attendee);
  }

  async editAttendee(attendee: Attendee) {
    await this.attendeeDb.editEventById(this.eventId(), this.userId(), attendee);
    await this.router.navigate([this.authService.isAdmin() ? '/attendees' : `/attendees/by-user-id/${this.userId()}`]);
  }

  async backToList() {
    await this.router.navigate([this.authService.isAdmin() ? '/attendees' : `/attendees/by-user-id/${this.userId()}`]);
  }
}
