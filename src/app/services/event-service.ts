import {computed, inject, Injectable, signal} from "@angular/core";
import {EventModel} from "../models/event.model";
import {BrowserStorageService} from "./browser-storage-service";
import {LocalStorageKey} from "../models/LocalStorageKey";

@Injectable({providedIn: 'root'})
export class EventService {
  private eventsState = signal<EventModel[]>([]);
  events = computed(() => (this.eventsState.asReadonly())() ?? this.getLocalStorage());

  storageService = inject(BrowserStorageService);

  updateEvents(events: EventModel[]) {
    this.eventsState.set(events);
  }

  findEventById(id: string) {
    return (this.eventsState()?.find(event => event.id === id)) ?? this.getLocalStorage()?.find(event => event.id === id);
  }

  removeEvents(){
    this.eventsState.set([]);
    this.removeStorage();
  }

  setLocalStorage(events: EventModel[]) {
    this.storageService.set(LocalStorageKey.postKey, JSON.stringify(events));
  }

  getLocalStorage(){
    return JSON.parse(this.storageService.get(LocalStorageKey.postKey) as string) as EventModel[] ?? [];
  }

  removeStorage(){
    this.storageService.remove(LocalStorageKey.postKey);
  }
}
