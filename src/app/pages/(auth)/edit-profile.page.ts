import {Component, inject, OnInit, signal} from "@angular/core";
import {EditProfileForm} from "../../components/auth/edit-profile-form/edit-profile-form";
import {EditUserProfileModel} from "../../models/auth/EditUserProfileModel";
import {User} from "../../models/User";
import {AuthDb} from "../../services/auth-db";
import {Router} from "@angular/router";
import {RouteMeta} from "@analogjs/router";
import {authGuard} from "../../guards/authGuard.guard";

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'app-edit-profile-page',
  imports: [EditProfileForm],
  template: `
    <app-edit-profile-form [user]="user()" (onBackToList)="backToList()" (onEditProfile)="editProfileSubmit($event)" ></app-edit-profile-form>
  `,
  standalone: true
})
export default class EditProfilePage implements OnInit{
  user = signal<User>(new User());

  authDb = inject(AuthDb);
  router = inject(Router);


  async ngOnInit() {
     const currentUser = await this.authDb.getCurrentUser();
     this.user.set(currentUser);
  }

  async backToList() {
    await this.router.navigate(['/']);
  }

  async editProfileSubmit(editUserProfile: EditUserProfileModel) {
    await this.authDb.editProfileUser(editUserProfile);
    await this.router.navigate(['/']);
  }
}
