import {Component, input, OnChanges, OnInit, output, signal, SimpleChanges} from '@angular/core';
import {form, FormField, required, readonly} from "@angular/forms/signals";
import {Attendee} from "../../../models/Attendee";
import {Status} from "../../../models/Status";

@Component({
  selector: 'app-attendee-edit-form',
  imports: [
    FormField
  ],
  templateUrl: './attendee-edit-form.html',
  styleUrl: './attendee-edit-form.css',
})
export class AttendeeEditForm implements OnInit, OnChanges{
  attendee = input.required<Attendee>()
  onAttendeeEdit = output<Attendee>()
  onBackToList = output<void>()

  attendeeEditModel = signal<Attendee>({
    eventId: "",
    userId: "",
    status: Status.Attending,
  });

  attendeeEditForm = form(this.attendeeEditModel, (schemaPath)=> {
    readonly(schemaPath.eventId);
    readonly(schemaPath.userId);
    required(schemaPath.status, {message: 'Status is required'});

  });

  ngOnChanges(_changes: SimpleChanges): void {
   this.loadAttendeeEditModel();
  }

  ngOnInit(): void {
    this.loadAttendeeEditModel();
  }

  loadAttendeeEditModel(){
    const attendee = this.attendee();
    console.log("In attendee-edit-form, attendee : ", attendee);
    this.attendeeEditModel.set({...attendee});
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    this.onAttendeeEdit.emit(this.attendeeEditModel())
  }

  backToList() {
    this.onBackToList.emit()
  }

  protected readonly Status = Status;
}
