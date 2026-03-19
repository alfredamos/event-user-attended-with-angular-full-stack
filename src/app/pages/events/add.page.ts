import {Component, inject} from "@angular/core";
import {EventCreateForm} from "../../components/events/event-create-form/event-create-form";
import {EventCreate} from "../../models/EventCreate.model";
import {EventDb} from "../../services/event-db";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-event-page',
  imports: [EventCreateForm],
  template: `
    <app-event-create-form
      (onEventCreate)="createEvent($event)"
      (onBackToList)="backToList()"
    >
    </app-event-create-form>
  `,
})
export default class AddEventPage {
  eventDb = inject(EventDb);
  router = inject(Router);

  async createEvent(event: EventCreate) {
    await this.eventDb.createEvent(event);
    await this.router.navigate(['/events']);
  }

  async backToList() {
    await this.router.navigate(['/events']);
  }
}
