import {inject, Injectable, signal} from "@angular/core";
import {EventModel} from "../models/event.model";
import {EventService} from "./event-service";
import {ApiHttpClientService} from "./api-http-client-service";
import {EventCreate} from "../models/EventCreate.model";

@Injectable({providedIn: 'root'})
export class EventDb {
  public data = signal<EventModel[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  eventService = inject(EventService);
  apiHttpClientService = inject(ApiHttpClientService) as ApiHttpClientService<EventModel| EventCreate | null>;

  async getEvents() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<EventModel[]>("/events");
      this.updateEvents(response);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);

    }
  }

  async getEventById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return  await this.apiHttpClientService.get<EventModel>(`/events/${id}`);
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteEventById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.delete<EventModel>(`/events/${id}`);
      const newEvents = this.eventService.events()?.filter(event => event.id !== response.id);
      this.updateEvents(newEvents);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async editEventById(id: string, event: EventModel) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.patch<EventModel>(`/events/${id}`, event);
      const newEvents = this.eventService.events()?.map(event => event.id === response.id ? response : event);
      this.updateEvents(newEvents);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  private updateEvents(newEvents: EventModel[]) {
    this.data.set(newEvents);
    this.eventService.updateEvents(newEvents);
    this.eventService.setLocalStorage(newEvents);
  }

  async createEvent(event: EventCreate) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<EventModel>(`/events`, event);
      const newEvents = [...this.eventService.events(), response];
      this.updateEvents(newEvents);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
