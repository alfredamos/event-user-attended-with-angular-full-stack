import {Component, input} from "@angular/core";
import {DetailUser} from "../../../components/users/detail-user/detail-user";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../../guards/authGuard.guard";
import {isOwnerCheckByIdOrAdminGuard} from "../../../guards/isOwnerCheckByIdOrAdminGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, isOwnerCheckByIdOrAdminGuard],
};

@Component({
  selector: 'app-detail-user-page',
  imports: [DetailUser],
  template: `
    <app-user-detail [userId]="id()"></app-user-detail>
  `,
})
export default class DetailUserPage {
  id = input.required<string>();
}
