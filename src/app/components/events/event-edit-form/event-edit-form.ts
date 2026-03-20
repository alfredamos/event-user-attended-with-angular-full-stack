import {Component, input, OnChanges, OnInit, output, signal, SimpleChanges} from '@angular/core';
import {EventModel} from "../../../models/event.model";
import {form, FormField, required} from "@angular/forms/signals";

@Component({
  selector: 'app-event-edit-form',
  imports: [ FormField],
  templateUrl: './event-edit-form.html',
  styleUrl: './event-edit-form.css',
})
export class EventEditForm implements OnInit, OnChanges{
  event = input.required<EventModel>()
  onEventEdit = output<EventModel>()
  onBackToList = output<void>()

  eventEditModel = signal<EventModel>({
    id: "",
    name: "",
    description: "",
    image: "",
    date: new Date(),
    location: ""

  });

  eventEditForm = form(this.eventEditModel, (schemaPath)=> {
    required(schemaPath.name, {message: 'Name is required'});
    required(schemaPath.description, {message: 'Description is required'});
    required(schemaPath.image, {message: 'Image is required'});
    required(schemaPath.location, {message: 'Location is required'});
    required(schemaPath.date, {message: 'Date is required'});
  });

  ngOnChanges(_changes: SimpleChanges): void {
    this.loadEventEditModel();
  }

  ngOnInit(): void {
    this.loadEventEditModel();
  }

  loadEventEditModel(){
    const event = this.event();
    event.date = new Date(event.date);
    this.eventEditModel.set({...event});
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    this.onEventEdit.emit(this.eventEditModel())
  }

  backToList() {
    this.onBackToList.emit()
  }
}
