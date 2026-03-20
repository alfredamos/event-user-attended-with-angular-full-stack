import {Component, OnInit, output, signal} from '@angular/core';
import {form, FormField, required} from "@angular/forms/signals";
import {EventCreate} from "../../../models/EventCreate.model";

@Component({
  selector: 'app-event-create-form',
  imports: [
    FormField
  ],
  templateUrl: './event-create-form.html',
  styleUrl: './event-create-form.css',
})
export class EventCreateForm implements OnInit{
  onEventCreate = output<EventCreate>()
  onBackToList = output<void>()

  eventCreateModel = signal<EventCreate>({
    name: "",
    description: "",
    image: "",
    date: new Date(),
    location: ""

  });

  eventCreateForm = form(this.eventCreateModel, (schemaPath)=> {
    required(schemaPath.name, {message: 'Name is required'});
    required(schemaPath.description, {message: 'Description is required'});
    required(schemaPath.image, {message: 'Image is required'});
    required(schemaPath.location, {message: 'Location is required'});
    required(schemaPath.date, {message: 'Date is required'});
  });

  ngOnInit(): void {
    this.eventCreateModel.set({...this.eventCreateModel()})
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    this.onEventCreate.emit(this.eventCreateModel())
  }

  backToList() {
    this.onBackToList.emit()
  }
}
