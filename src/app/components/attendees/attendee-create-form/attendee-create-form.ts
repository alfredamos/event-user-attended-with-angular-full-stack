import {Component, input, OnInit, output, signal} from '@angular/core';
import {form, FormField, required} from "@angular/forms/signals";
import {AttendeeCreate} from "../../../../server/validations/attendee.validation";
import {EventModel} from "../../../models/event.model";
import {User} from "../../../models/User";

@Component({
  selector: 'app-attendee-create-form',
  imports: [
    FormField
  ],
  templateUrl: './attendee-create-form.html',
  styleUrl: './attendee-create-form.css',
})
export class AttendeeCreateForm implements OnInit{
  events = input.required<EventModel[]>();
  users = input.required<User[]>();

  onAttendeeCreate = output<AttendeeCreate>()
  onBackToList = output<void>()

  attendeeCreateModel = signal<AttendeeCreate>({
    eventId: "",
    userId: "",

  });

  attendeeCreateForm = form(this.attendeeCreateModel, (schemaPath)=> {
    required(schemaPath.eventId, {message: 'Event Id is required'});
    required(schemaPath.userId, {message: 'User Id is required'});

  });

  ngOnInit(): void {
    this.attendeeCreateModel.set({...this.attendeeCreateModel()})
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    this.onAttendeeCreate.emit(this.attendeeCreateModel())
  }

  backToList() {
    this.onBackToList.emit()
  }
}
