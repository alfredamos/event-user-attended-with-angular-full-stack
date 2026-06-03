import {Component} from "@angular/core";
import {AttendeesTable} from "../../components/attendees/attendees-table/attendees-table";
import {RouteMeta} from "@analogjs/router";
import {adminGuard} from "../../guards/adminGuard.guard";
import {authGuard} from "../../guards/authGuard.guard";
import {httpResource} from "@angular/common/http";
import {AttendeeResponse} from "../../../server/dto/attendeeRequest.dto";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-attendees-list-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendees.value()" ></app-attendees-table>
  `,
})
export default class AttendeesListPage {
  attendees = httpResource<AttendeeResponse[]>(() => `/attendees`, {
    defaultValue: []
  })
}
