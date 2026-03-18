import {inject, Injectable, signal} from '@angular/core';
import {UserService} from './user-service';
import {User} from '../models/User';
import { ApiHttpClientService } from './api-http-client-service';

@Injectable({
  providedIn: 'root',
})
export class UserDb {
  public data = signal<User[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  apiHttpClientService = inject(ApiHttpClientService) as ApiHttpClientService<User>;
  userService = inject(UserService);

  async getUsers() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<User[]>("/users");
      console.log(response)
      this.updateUsers(response);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteUserById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.delete<User>(`/users/${id}`);
      const newUsers = this.userService.users()?.filter(user => user.id !== response.id);
      this.updateUsers(newUsers);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async getUserById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<User>(`/users/${id}`);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getUserByEmail(email: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<User>(`/users/get-user-by-email/${email}`);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  private updateUsers(newUsers: User[]) {
    this.data.set(newUsers);
    this.userService.updateUsers(newUsers);
    this.userService.setLocalStorage(newUsers);
  }

}
