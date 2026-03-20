import {Component, input, output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {AttendeeResponse} from "../../../../server/dto/attendeeRequest.dto";
import {RouterLink} from "@angular/router";
import {ModalDialog} from "../../../utils/modal-dialog/modal-dialog";
import {EventModel} from "../../../models/event.model";
import {AttendeeCreate} from "../../../../server/validations/attendee.validation";

@Component({
  selector: 'app-attendee-detail',
  imports: [
    DatePipe,
    RouterLink,
    ModalDialog
  ],
  templateUrl: './attendee-detail.html',
  styleUrl: './attendee-detail.css',
})
export class AttendeeDetail {
  isModalOpen = input.required<boolean>();
  attendeeResponse = input.required<AttendeeResponse>();
  isAdmin = input.required<boolean>();

  onOpenModal = output<void>();
  onDeleteAttendee = output<AttendeeCreate>();
  onModalClose = output<void>();

  openModal() {
    this.onOpenModal.emit();
  }

  modalClose() {
    this.onModalClose.emit();
  }

  deleteAttendee(attendee: AttendeeCreate ){
    this.onDeleteAttendee.emit(attendee);
  }

}
