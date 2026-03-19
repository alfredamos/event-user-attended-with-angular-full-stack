import {computed, inject, Injectable, signal} from "@angular/core";
import {BrowserStorageService} from "./browser-storage-service";
import {LocalStorageKey} from "../models/LocalStorageKey";
import {Attendee} from "../models/Attendee";

@Injectable({providedIn: 'root'})
export class AttendeeService {
  private attendeesState = signal<Attendee[]>([]);
  attendees = computed(() => (this.attendeesState.asReadonly())() ?? this.getLocalStorage());

  storageService = inject(BrowserStorageService);

  updateAttendees(attendees: Attendee[]) {
    this.attendeesState.set(attendees);
  }

  findAttendeeById(eventId: string, userId: string) {
    return (this.attendeesState()?.find(attendee => attendee.eventId && attendee.userId === eventId && userId));
  }

  removeAttendees(){
    this.attendeesState.set([]);
    this.removeStorage();
  }

  setLocalStorage(attendees: Attendee[]) {
    this.storageService.set(LocalStorageKey.postKey, JSON.stringify(attendees));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.postKey) as string) as Attendee[] ?? [];
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.postKey);
  }
}
