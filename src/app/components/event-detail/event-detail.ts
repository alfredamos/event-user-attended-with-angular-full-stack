import {Component, input, output, signal} from '@angular/core';
import {EventModel} from "../../models/event.model";
import {RouterLink} from "@angular/router";
import {ModalDialog} from "../../utils/modal-dialog/modal-dialog";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-event-detail',
  imports: [
    ModalDialog,
    DatePipe,
    RouterLink
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {
  isModalOpen = input.required<boolean>();
  event = input.required<EventModel>();

  onAddAttendee = output<EventModel>();
  onOpenModal = output<void>();
  onDeleteEvent = output<EventModel>();
  onModalClose = output<void>();


  addEvent (event: EventModel){
    this.onAddAttendee.emit(event);
  }

  openModal() {
    this.onOpenModal.emit();
  }

  modalClose() {
    this.onModalClose.emit();
  }

  deleteEvent(event: EventModel){
    this.onDeleteEvent.emit(event);
  }
}
