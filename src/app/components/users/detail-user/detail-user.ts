import {Component, inject, input, OnInit, signal} from '@angular/core';
import {User} from "../../../models/User";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user-service";
import {ModalDialog} from "../../../utils/modal-dialog/modal-dialog";
import {UserDb} from "../../../services/user-db";

@Component({
  selector: 'app-user-detail',
  imports: [
    ModalDialog,
    RouterLink
  ],
  templateUrl: './detail-user.html',
  styleUrl: './detail-user.css',
  standalone: true
})
export class DetailUser implements OnInit{
  userId = input.required<string>();
  user = signal<User>(new User())
  isModalOpen = false;

  router = inject(Router)
  userDb =inject(UserDb)
  userService = inject(UserService);

  ngOnInit() {
    const user = this.loadUser();
    this.user.set(user)
  }

  loadUser(){
    return this.userService.findUserById(this.userId())
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  async deleteUser(){
    await this.userDb.deleteUserById(this.userId())
    await this.router.navigate(['/users']);
  }
}
