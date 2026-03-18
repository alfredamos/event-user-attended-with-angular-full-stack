import {Component, input, output, signal, SimpleChanges} from '@angular/core';
import {form, required, email, FormField} from '@angular/forms/signals';
import {ChangeUserPasswordModel} from "../../../models/auth/ChangeUserPasswordModel";

@Component({
  selector: 'app-change-password-form',
  imports: [
    FormField
  ],
  templateUrl: './change-password-form.html',
})
export class ChangePasswordForm {
  email = input.required<string>()
  onChangeUserPassword = output<ChangeUserPasswordModel>()
  onBackToList = output<void>()

  changeUserPasswordModel = signal<ChangeUserPasswordModel>({
    email: "",
    password: "",
    confirmPassword: "",
    newPassword: ""
  });

  changeUserPasswordForm = form(this.changeUserPasswordModel, (schemaPath)=> {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
    required(schemaPath.confirmPassword, {message: 'ConfirmPassword is required'});
    required(schemaPath.newPassword, {message: 'NewPassword is required'});
    required(schemaPath.password, {message: 'Password is required'});
  });

  ngOnChanges(_changes: SimpleChanges): void {
    this.email();
    this.changeUserPasswordModel.set({...this.changeUserPasswordModel(), email: this.email()})
  }

  ngOnInit(): void {
    this.email();
    this.changeUserPasswordModel.set({...this.changeUserPasswordModel(), email: this.email()})
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    this.onChangeUserPassword.emit(this.changeUserPasswordModel())
  }

  backToList() {
    this.onBackToList.emit()
  }
}
