import {inject, Injectable, signal} from "@angular/core";
import { Session } from "src/server/models/session.model";
import { ResponseMessage } from "../models/ResponseMessage";
import { ApiHttpClientService } from "./api-http-client-service";
import { LoginUserModel } from "../models/auth/LoginUserModel";
import { ChangeUserRole } from "src/server/validations/auth.validation";
import { ChangeUserPasswordModel } from "../models/auth/ChangeUserPasswordModel";
import { EditUserProfileModel } from "../models/auth/EditUserProfileModel";
import { SignupUserModel } from "../models/auth/SignupUserModel";
import { User } from "../models/User";
import { AuthService } from "./auth-service";
import {AttendeeService} from "./attendee-service";
import {UserService} from "./user-service";
import {EventService} from "./event-service";

@Injectable({ providedIn: 'root' })
export class AuthDb {
  public data = signal<Session | ResponseMessage | User | null>(null);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  private apiHttpClientService = inject(
    ApiHttpClientService,
  ) as ApiHttpClientService<
    | LoginUserModel
    | ChangeUserPasswordModel
    | EditUserProfileModel
    | ChangeUserRole
    | null
  >;
  private authService = inject(AuthService);
  private attendeeService = inject(AttendeeService);
  private eventService = inject(EventService);
  private userService = inject(UserService);

  async changeUserPassword(changeUserPasswordModel: ChangeUserPasswordModel) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.patch<ResponseMessage>(
        '/auth/changeUserPassword',
        changeUserPasswordModel,
      );
      this.data.set(response);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async changeUserRole(changeRoleOfUser: ChangeUserRole) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.patch<ResponseMessage>(
        '/auth/change-role',
        changeRoleOfUser,
      );
      this.data.set(response);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async editProfileUser(editUserProfileModel: EditUserProfileModel) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.patch<ResponseMessage>(
        '/auth/edit-profile',
        editUserProfileModel,
      );
      this.data.set(response);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async loginUser(loginUser: LoginUserModel) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<Session>(
        '/auth/login',
        loginUser,
      );
      this.updateSession(response);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  updateSession(session: Session) {
    this.data.set(session);
    this.authService.setSession(session);
    this.authService.setLocalStorage(session);
  }

  async logoutUser() {
    this.isLoading.set(true);
    this.error.set(null);
    console.log("In logout now******");
    try {
      const response = await this.apiHttpClientService.post<Session>(
        '/auth/logout',
        null,
      );
      this.data.set(response);
      this.removeStoresAndLocalStorages();
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async getCurrentUser() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<User>('/auth/me');
      this.updateCurrentUser(response);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async signupUser(signupUser: SignupUserModel) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<ResponseMessage>(
        '/auth/signup',
        signupUser,
      );
      this.data.set(response);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async refreshUserToken() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<Session>(
        '/auth/refresh',
        null,
      );
      this.updateSession(response);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  removeStoresAndLocalStorages() {
    this.authService.removeSession();
    this.attendeeService.removeAttendees();
    this.eventService.removeEvents();
    this.userService.removeUsers();
  }

  updateCurrentUser(user: User) {
    this.data.set(user);
    this.authService.updateCurrentUser(user);
    this.authService.setCurrentUserLocalStorage(user);
  }
}
