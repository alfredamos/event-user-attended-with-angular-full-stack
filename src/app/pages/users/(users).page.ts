import {Component, inject, OnInit} from "@angular/core";
import {UserTable} from "../../components/users/user-table/user-table";
import {UserDb} from "../../services/user-db";
import {UserService} from "../../services/user-service";
import {AuthDb} from "../../services/auth-db";
import {ChangeUserRole} from "../../models/auth/ChangeUserRole";
import {RouteMeta} from "@analogjs/router";
import {adminGuard} from "../../guards/adminGuard.guard";
import {authGuard} from "../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-users-list-page',
  imports: [UserTable],
  template: `
    <app-user-table
      [users]="userService.users()"
      (onChangeRole)="changeRole($event)"
    />
  `,
})
export default class UsersListPage implements OnInit{
  authDb = inject(AuthDb);
  userDb = inject(UserDb)
  userService = inject(UserService);

  ngOnInit(): void {
    this.userDb.getUsers().then(() => {
    }).catch(console.error);
  }

  async changeRole(user: ChangeUserRole) {
    await this.authDb.changeUserRole({email: user.email})
    this.userDb.getUsers().then(() => {
    }).catch(console.error);
  }
}
