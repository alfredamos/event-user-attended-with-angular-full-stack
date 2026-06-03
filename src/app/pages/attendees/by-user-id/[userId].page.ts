import {Component, input} from "@angular/core";
import {AttendeesTable} from "../../../components/attendees/attendees-table/attendees-table";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../../guards/authGuard.guard";
import {isOwnerCheckByUserIdOrAdminGuard} from "../../../guards/isOwnerCheckByUserIdOrAdminGuard.guard";
import {httpResource} from "@angular/common/http";
import {AttendeeResponse} from "../../../../server/dto/attendeeRequest.dto";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, isOwnerCheckByUserIdOrAdminGuard],
};

@Component({
  selector: 'app-attendees-by-user-id-page',
  imports: [AttendeesTable],
  template: `
    <app-attendees-table [attendees]="attendees.value()" ></app-attendees-table>
  `,
})
export default class AttendeesByUserIdPage{
  userId = input.required<string>();

  attendees = httpResource<AttendeeResponse[]>(() => `/attendees/by-user-id/${this.userId()}`, {
    defaultValue: []
  })
}
