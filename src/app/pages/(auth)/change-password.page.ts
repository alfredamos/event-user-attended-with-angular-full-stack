import {Component} from "@angular/core";
import {authGuard} from "../../guards/authGuard.guard";
import {RouteMeta} from "@analogjs/router";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-change-password-page',
  imports: [],
  template: `
  <div>Change Password Page</div>
  `
})
export default class ChangePasswordPage {}
