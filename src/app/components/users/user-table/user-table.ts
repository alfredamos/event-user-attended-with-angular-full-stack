import { Component, input, output } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {User} from "../../../models/User";
import {ChangeUserRole} from "../../../models/auth/ChangeUserRole";

@Component({
  selector: 'app-user-table',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UserTable {
  users = input.required<User[]>()

  onChangeRole = output<ChangeUserRole>()

  async changeRole(user: ChangeUserRole) {
    this.onChangeRole.emit(user);
  }
}
