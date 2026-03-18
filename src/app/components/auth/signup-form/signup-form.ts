import {Component, output, signal} from '@angular/core';
import {email, FormField, form, required} from '@angular/forms/signals';
import {SignupUserModel} from "../../../models/auth/SignupUserModel";
import {Gender} from "../../../models/Gender";

@Component({
  selector: 'app-signup-form',
  imports: [
    FormField
  ],
  templateUrl: './signup-form.html',
  standalone: true
})
export class SignupForm {
  onSignup= output<SignupUserModel>();
  onBackToList = output<void>()

  signupUserModel = signal<SignupUserModel>({
    email: "",
    name: "",
    image: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: Gender.Male
  });

  signupUserForm = form(this.signupUserModel, (schemaPath)=> {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
    required(schemaPath.name, {message: "Name is required"});
    required(schemaPath.image, {message: "Image is required"});
    required(schemaPath.confirmPassword, {message: "Confirm Password is required"});
    required(schemaPath.password, {message: "Password is required"});
    required(schemaPath.phone, {message: "Phone is required"});
  })

  onSubmit($event: Event) {
    $event.preventDefault();
    this.onSignup.emit(this.signupUserModel())
  }

  backToList() {
    this.onBackToList.emit()
  }
}
