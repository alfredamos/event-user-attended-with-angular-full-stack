import {Component, inject, input, OnInit} from "@angular/core";
import {AttendeeDb} from "../../../services/attendee-db";
import {AttendeeService} from "../../../services/attendee-service";
import {AttendeesTable} from "../../../components/attendees/attendees-table/attendees-table";
import {adminGuard} from "../../../guards/adminGuard.guard";
import {authGuard} from "../../../guards/authGuard.guard";
import {RouteMeta} from "@analogjs/router";
import {httpResource} from "@angular/common/http";
import {AttendeeResponse} from "../../../../server/dto/attendeeRequest.dto";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-attendees-by-status-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendees.value()" ></app-attendees-table>
  `,
})
export default class AttendeesByStatusPage{
  status = input.required<string>();

  attendees = httpResource<AttendeeResponse[]>(() => `/attendees/by-status/${this.status()}`, {
    defaultValue: []
  });

}
