import {computed, inject, Injectable, signal} from '@angular/core';
import {BrowserStorageService} from './browser-storage-service';
import {User} from '../models/User';
import {LocalStorageKey} from '../models/LocalStorageKey';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersState = signal<User[]>([]);
  users = computed(() => (this.usersState.asReadonly())() || this.getLocalStorage());

  storageService = inject(BrowserStorageService);

  updateUsers(users: User[]) {
    this.usersState.set(users);
  }

  removeUsers(){
    this.usersState.set([]);
    this.removeStorage();
  }

  findUserById(id: string) {
    return (this.usersState()?.find(user => user.id === id) ?? this.getLocalStorage()?.find(user => user.id === id)) as User;
  }

  setLocalStorage(users: User[]) {
    this.storageService.set(LocalStorageKey.userKey, JSON.stringify(users));
    //localStorage.setItem(LocalStorageKey.userKey, JSON.stringify(users));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.userKey) as string) as User[] ?? [];
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.userKey);
  }

  findUserByEmail(email: string) {
    return (this.usersState()?.find(user => user.email === email) ?? this.getLocalStorage()?.find(user => user.email === email)) as User;
  }

}
