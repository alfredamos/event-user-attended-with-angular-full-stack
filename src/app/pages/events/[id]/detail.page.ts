import {Component, inject, input, OnChanges, OnInit, signal, SimpleChanges} from "@angular/core";
import {EventDetail} from "../../../components/event-detail/event-detail";
import {EventModel} from "../../../models/event.model";
import {AttendeeDb} from "../../../services/attendee-db";
import {AuthService} from "../../../services/auth-service";
import {EventDb} from "../../../services/event-db";
import {EventService} from "../../../services/event-service";
import {Router} from "@angular/router";
import {AttendeeCreate} from "../../../../server/validations/attendee.validation";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../../guards/authGuard.guard";
import {httpResource} from "@angular/common/http";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-detail-event-page',
  imports: [EventDetail],
  template: `
    <app-event-detail
      [event]="event.value()"
      [isModalOpen]="isModalOpen()"
      (onAddAttendee)="addAttendee($event)"
      (onDeleteEvent)="deleteEvent($event)"
      (onOpenModal)="openModal()"
      (onModalClose)="onModalClose()"
    >
    </app-event-detail>
  `,
})
export default class DetailEventPage {
  id = input.required<string>();

  isModalOpen = signal(false);
  event = httpResource<EventModel>(() => `/events/${this.id()}` , {
    defaultValue: new EventModel()
  })

  attendeeDb = inject(AttendeeDb);
  authService = inject(AuthService);
  eventDb = inject(EventDb);
  router = inject(Router);

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

  openModal() {
    this.isModalOpen.set(true);
  }

  onModalClose() {
    this.isModalOpen.set(false);
  }

  async deleteEvent(event: EventModel){
    await this.eventDb.deleteEventById(event?.id)
    await this.router.navigate(['/events']);
  }
}
