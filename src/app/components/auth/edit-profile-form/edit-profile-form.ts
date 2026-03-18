import {Component, input, OnChanges, OnInit, output, signal, SimpleChanges} from '@angular/core';
import {email, FormField, form, required} from '@angular/forms/signals';
import {User} from "../../../models/User";
import {Gender} from "../../../models/Gender";
import {EditUserProfileModel} from "../../../models/auth/EditUserProfileModel";

@Component({
  selector: 'app-edit-profile-form',
  imports: [
    FormField
  ],
  templateUrl: './edit-profile-form.html',
  standalone: true
})
export class EditProfileForm implements OnInit, OnChanges{
  user = input.required<User>()
  onEditProfile = output<EditUserProfileModel>();
  onBackToList = output<void>();

  editUserProfileModel = signal<EditUserProfileModel>({
    email: "",
    name: "",
    image: "",
    phone: "",
    password: "",
    gender: Gender.Male,
  })

  editUserProfileForm = form(this.editUserProfileModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
    required(schemaPath.name, {message: "Name is required"});
    required(schemaPath.image, {message: "Image is required"});
    required(schemaPath.password, {message: "Password is required"});
    required(schemaPath.phone, {message: "Phone is required"});
  })

  ngOnInit(){
    this.onLoadUser();
  }

  ngOnChanges (_changes: SimpleChanges){
    this.onLoadUser();
  }

  onLoadUser = () => {
    this.user();
    const editUserProfile = this.fromUserToEditProfileModel(this.user());
    this.editUserProfileModel.set(editUserProfile);
  }


  onSubmit=($event: Event)=> {
    $event.preventDefault()

    this.onEditProfile.emit(this.inputFromEditProfileForm(this.editUserProfileModel()));  }

  backToList() {
    this.onBackToList.emit()
  }

  fromUserToEditProfileModel(user : User): EditUserProfileModel{
    return {
      email: user?.email,
      gender: user?.gender,
      image: user?.image,
      password: "",
      phone: user?.phone,
      role: user?.role,
      name: user?.name,
    }
  }

  inputFromEditProfileForm(request: EditUserProfileModel){
    return {
      email: request.email,
      gender: request.gender,
      image: request.image,
      password: request.password,
      phone: request.phone,
      role: request.role,
      name: request.name,
    }
  }

  protected readonly Gender = Gender;
}
