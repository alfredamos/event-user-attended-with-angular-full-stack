import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";
import {LoginForm} from "../../components/auth/login-form/login-form";
import {LoginUserModel} from "../../models/auth/LoginUserModel";
import {AuthDb} from "../../services/auth-db";

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  template: `
   <app-login-form (onBack)="backToList()" (onLogin)="loginSubmit($event)" ></app-login-form>
  `,
  standalone: true
})
export default class LoginPage {
  authDb = inject(AuthDb)

  router = inject(Router);

  async backToList() {
    await this.router.navigate(['/']);
  }

  async loginSubmit(loginUser: LoginUserModel) {
    await this.authDb.loginUser(loginUser);
    await this.router.navigate(['/']);
  }
}
