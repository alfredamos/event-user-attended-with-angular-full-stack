import {Component, inject, input, OnInit, signal} from "@angular/core";
import {EventEditForm} from "../../../components/events/event-edit-form/event-edit-form";
import {EventService} from "../../../services/event-service";
import {EventModel} from "../../../models/event.model";
import {EventDb} from "../../../services/event-db";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-event-page',
  imports: [EventEditForm],
  template: `
    <app-event-edit-form
      [event]="event()"
      (onEventEdit)="editEvent($event)"
      (onBackToList)="backToList()"
    >
    </app-event-edit-form>
  `,
})
export default class EditEventPage implements OnInit{
  event = signal<EventModel>(new EventModel())

  id = input.required<string>();

  eventDb = inject(EventDb);
  eventService = inject(EventService);
  router = inject(Router);

  async ngOnInit() {
    const oneEvent = this.loadEvent();
    this.event.set(oneEvent);
  }

  loadEvent() {
    return this.eventService.findEventById(this.id()) as unknown as EventModel;
  }

  async editEvent(event: EventModel){
    event.id = this.id();
    await this.eventDb.editEventById(this.id(), event);
    await this.router.navigate(['/events']);
  }

  async backToList() {
    await this.router.navigate(['/events']);
  }
}
