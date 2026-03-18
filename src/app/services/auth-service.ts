import {computed, inject, Injectable, signal} from "@angular/core";
import {Session} from "../../server/models/session.model";
import {BrowserStorageService} from "./browser-storage-service";
import {User} from "../models/User";
import {LocalStorageKey} from "../models/LocalStorageKey";

@Injectable({providedIn: 'root'})
export class AuthService {
  private authRes = signal<Session>(new Session())
  private currentUser = signal<User>(new User());

  authSession = this.authRes.asReadonly();
  accessToken = computed(() => this.authSession()?.accessToken || this.getLocalStorage()?.accessToken)
  isAdmin = computed(() => this.authSession()?.isAdmin || this.getLocalStorage()?.isAdmin);
  isLoggedIn = computed(() => this.authSession()?.isLoggedIn || this.getLocalStorage()?.isLoggedIn);
  email = computed(() => this.authSession()?.email || this.getLocalStorage()?.email);
  userCurrent = computed(() => this.currentUser() || this.getCurrentUserLocalStorage());

  storageService = inject(BrowserStorageService);

  setSession(userSession: Session){
    this.authRes.set(userSession);

  }

  removeSession(){
    this.authRes.set(new Session());
    this.removeCurrentUser();
    this.removeCurrentUserLocalStorage();
    this.removeStorage();
  }

  setLocalStorage(session: Session){
    this.storageService.set(LocalStorageKey.authKey, JSON.stringify(session));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.authKey) as string ) as Session;
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.authKey);
  }

  updateCurrentUser(user: User){
    this.currentUser.set(user);
  }

  removeCurrentUser(){
    this.currentUser.set(new User())
  }

  setCurrentUserLocalStorage(user: User){
    this.storageService.set(LocalStorageKey.currentUserKey, JSON.stringify(user));
  }

  getCurrentUserLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.currentUserKey) as string) as User;
  }

  removeCurrentUserLocalStorage(){
    this.removeCurrentUser()
    this.storageService.remove(LocalStorageKey.currentUserKey);
  }
}
