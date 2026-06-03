import {Component, inject, input, OnChanges, OnInit, signal, SimpleChanges} from "@angular/core";
import {EventEditForm} from "../../../components/events/event-edit-form/event-edit-form";
import {EventModel} from "../../../models/event.model";
import {EventDb} from "../../../services/event-db";
import {Router} from "@angular/router";
import {RouteMeta} from "@analogjs/router";
import {adminGuard} from "../../../guards/adminGuard.guard";
import {authGuard} from "../../../guards/authGuard.guard";
import {httpResource} from "@angular/common/http";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-edit-event-page',
  imports: [EventEditForm],
  template: `
    <app-event-edit-form
      [event]="event.value()"
      (onEventEdit)="editEvent($event)"
      (onBackToList)="backToList()"
    >
    </app-event-edit-form>
  `,
})
export default class EditEventPage {
  id = input.required<string>();

  event = httpResource<EventModel>(() => `/events/${this.id()}`, {
    defaultValue: new EventModel()
  })

  eventDb = inject(EventDb);
  router = inject(Router);

  async editEvent(event: EventModel){
    event.id = this.id();
    await this.eventDb.editEventById(this.id(), event);
    await this.router.navigate(['/events']);
  }

  async backToList() {
    await this.router.navigate(['/events']);
  }
}
