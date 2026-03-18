import {Component, inject, OnInit, signal} from '@angular/core';
import {User} from "../../../models/User";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user-service";
import {ModalDialog} from "../../utils/modal-dialog/modal-dialog";
import { UserHttpClientDb } from '../../../services/user-db-httpClient';

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
  userId = "";
  user = signal<User>(new User())
  isModalOpen = false;

  route = inject(ActivatedRoute);
  router = inject(Router)
  userDb =inject(UserHttpClientDb)
  userService = inject(UserService);

  async ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    const user = await this.loadUser();
    this.user.set(user)
  }

  async loadUser(){
    let oneUser = await this.userDb.getUserById(this.userId);
    return this.userService.findUserById(this.userId) ?? oneUser
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  async deleteUser(){
    await this.userDb.deleteUserById(this.userId)
    await this.router.navigate(['/users']);
  }
}
