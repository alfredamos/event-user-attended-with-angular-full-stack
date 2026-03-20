import {computed, inject, Injectable, signal} from "@angular/core";
import {BrowserStorageService} from "./browser-storage-service";
import {LocalStorageKey} from "../models/LocalStorageKey";
import {Attendee} from "../models/Attendee";
import {AttendeeResponse} from "../../server/dto/attendeeRequest.dto";

@Injectable({providedIn: 'root'})
export class AttendeeService {
  private attendeesState = signal<AttendeeResponse[]>([]);
  attendees = computed(() => (this.attendeesState.asReadonly())() ?? this.getLocalStorage());

  storageService = inject(BrowserStorageService);

  updateAttendees(attendees: AttendeeResponse[]) {
    this.attendeesState.set(attendees);
  }

  findAttendeeById(eventId: string, userId: string) {
    const attendResp =  (this.attendeesState()?.find(attendee => attendee.eventId && attendee.userId === eventId && userId));
    return attendResp ?? this.getLocalStorage()?.find(attendee => attendee.eventId === eventId && attendee.userId === userId);
  }

  removeAttendees(){
    this.attendeesState.set([]);
    this.removeStorage();
  }

  setLocalStorage(attendees: AttendeeResponse[]) {
    this.storageService.set(LocalStorageKey.attendeeKey, JSON.stringify(attendees));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.attendeeKey) as string) as AttendeeResponse[] ?? [];
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.attendeeKey);
  }
}
