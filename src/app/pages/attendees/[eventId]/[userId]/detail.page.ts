import {Component, inject, input, OnChanges, OnInit, signal, SimpleChanges} from "@angular/core";
import {AttendeeDetail} from "../../../../components/attendees/attendee-detail/attendee-detail";
import {AttendeeResponse} from "../../../../../server/dto/attendeeRequest.dto";
import {AuthService} from "../../../../services/auth-service";
import {AttendeeService} from "../../../../services/attendee-service";
import {AttendeeCreate} from "../../../../../server/validations/attendee.validation";
import {AttendeeDb} from "../../../../services/attendee-db";
import {Router} from "@angular/router";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-detail-attendee-page-by-id',
  imports: [AttendeeDetail],
  template: `
    <app-attendee-detail
      [attendeeResponse]="attendeeResponse()"
      [isAdmin]="authService.isAdmin()"
      [isModalOpen]="isModalOpen()"
      (onOpenModal)="openModal()"
      (onModalClose)="closeModal()"
      (onDeleteAttendee)="deleteAttendee($event)"
    >
    </app-attendee-detail>
  `,
})
export default class DetailAttendeePageById implements OnInit, OnChanges{
  isModalOpen = signal(false);

  eventId = input.required<string>();
  userId = input.required<string>();

  attendeeResponse = signal<AttendeeResponse>(new AttendeeResponse());

  authService = inject(AuthService);
  attendeeDb = inject(AttendeeDb);
  attendeeService = inject(AttendeeService);
  router = inject(Router);

  ngOnInit(): void {
    this.attendeeResponse.set(this.attendeeService.findAttendeeById(this.eventId(), this.userId()) as unknown as AttendeeResponse);
  }

  ngOnChanges(_simpleChanges: SimpleChanges): void {
    this.attendeeResponse.set(this.attendeeService.findAttendeeById(this.eventId(), this.userId()) as unknown as AttendeeResponse);
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }


  async deleteAttendee(attendee: AttendeeCreate) {
    await this.attendeeDb.deleteAttendeeById(attendee.eventId, attendee.userId);
    await this.router.navigate([this.authService.isAdmin() ? '/attendees' : `/attendees/by-user-id/${this.userId()}`]);
  }
}
