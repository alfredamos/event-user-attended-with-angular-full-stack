import {Component} from "@angular/core";
import {RouteMeta} from "@analogjs/router";
import {adminGuard} from "../../../../guards/adminGuard.guard";
import {authGuard} from "../../../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-delete-attendee-page-by-id',
  imports: [],
  template: `
    <div>Delete Attendee Page</div>
  `,
})
export default class DeleteAttendeePageById {}
