import { Component, input, output } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {User} from "../../../models/User";

@Component({
  selector: 'app-user-table',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UserTable {
  users = input.required<User[]>()
  protected readonly encodeURIComponent = encodeURIComponent;

  onChangeRole = output<User>()

  async changeRole(user: User) {
    this.onChangeRole.emit(user);
  }
}
