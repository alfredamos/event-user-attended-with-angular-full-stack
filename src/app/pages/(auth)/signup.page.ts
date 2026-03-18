import {Component, inject} from "@angular/core";
import {SignupForm} from "../../components/auth/signup-form/signup-form";
import {SignupUserModel} from "../../models/auth/SignupUserModel";
import {AuthDb} from "../../services/auth-db";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  imports: [SignupForm],
  template: `
    <app-signup-form (onBackToList)="backToList()" (onSignup)="signupSubmit($event)"></app-signup-form>
  `,
  standalone: true
})
export default class SignupPage {
  authDb = inject(AuthDb);
  router = inject(Router);

  async backToList() {
    await this.router.navigate(['/']);
  }

  async signupSubmit(signupUser: SignupUserModel) {
    await this.authDb.signupUser(signupUser);
    await this.router.navigate(['/']);
  }
}
