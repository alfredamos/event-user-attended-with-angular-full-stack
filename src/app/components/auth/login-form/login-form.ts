import {Component, output, signal, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {email, FormField, form, required} from '@angular/forms/signals';
import {LoginUserModel} from "../../../models/auth/LoginUserModel";

@Component({
  selector: 'app-login-form',
  imports: [
    FormField
  ],
  templateUrl: './login-form.html',
})
export class LoginForm{
  loginUserModel = signal<LoginUserModel>({
    email: '',
    password: '',
  });

  loginUserForm = form(this.loginUserModel, (schemaPath)=> {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
    required(schemaPath.password, {message: 'Password is required'});
  })

  onLogin = output<LoginUserModel>()
  onBack = output<void>()

  onSubmit(event: Event) {
    console.log("At point 3, in login-form-component, onSubmit");
    event.preventDefault();
    console.log("In login-form-component, loginUserPayload : ", this.loginUserModel())
    this.onLogin.emit(this.loginUserModel())

  }

  backToList() {
    console.log("At point 4, in login-form-component, backToList");
    this.onBack.emit()
  }
}
