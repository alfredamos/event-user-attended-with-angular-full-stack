import {Component, inject} from "@angular/core";
import {UserTable} from "../../components/users/user-table/user-table";
import {UserService} from "../../services/user-service";
import {AuthDb} from "../../services/auth-db";
import {ChangeUserRole} from "../../models/auth/ChangeUserRole";
import {RouteMeta} from "@analogjs/router";
import {adminGuard} from "../../guards/adminGuard.guard";
import {authGuard} from "../../guards/authGuard.guard";
import {httpResource} from "@angular/common/http";
import {User} from "../../models/User";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, adminGuard],
};

@Component({
  selector: 'app-users-list-page',
  imports: [UserTable],
  template: `
    <app-user-table
      [users]="users.value()"
      (onChangeRole)="changeRole($event)"
    />
  `,
})
export default class UsersListPage {
  authDb = inject(AuthDb);
  userService = inject(UserService);

  users = httpResource<User[]>(() => "/users", {
    defaultValue: [],
  })

  async changeRole(user: ChangeUserRole) {
    await this.authDb.changeUserRole({email: user.email})
    this.users.set(this.userService.users())
  }
}
