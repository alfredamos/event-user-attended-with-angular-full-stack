import {inject, Injectable, signal} from "@angular/core";
import {ApiHttpClientService} from "./api-http-client-service";
import {Attendee} from "../models/Attendee";
import {AttendeeService} from "./attendee-service";
import {AttendeeCreate} from "../../server/validations/attendee.validation";

@Injectable({providedIn: 'root'})
export class AttendeeDb {
  public data = signal<Attendee[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  attendeeService = inject(AttendeeService);
  apiHttpClientService = inject(ApiHttpClientService) as ApiHttpClientService<Attendee| AttendeeCreate | null>;

  async getAllAttendees() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<Attendee[]>("/attendees");
      this.updateAttendees(response);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);

    }
  }
  async getAttendeesByEventId(eventId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<Attendee[]>(`/attendees/by-event-id/${eventId}`);
      this.updateAttendees(response);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);

    }
  }
  async getAttendeesByUserId(userId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<Attendee[]>(`/attendees/by-user-id/${userId}`);
      this.updateAttendees(response);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);

    }
  }
  async getAttendeesByStatus(status: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.get<Attendee[]>(`/attendees/by-status/${status}`);
      this.updateAttendees(response);
      return response;
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);

    }
  }

  async getAttendeeById(eventId: string, userId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return await this.apiHttpClientService.get<Attendee>(`/attendees/${eventId}/${userId}`);
    } catch (err: any) {
      this.error.set(err.message);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteAttendeeById(eventId: string, userId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.delete<Attendee>(`/attendees/${eventId}/${userId}`);
      const newAttendees = this.attendeeService.attendees()?.filter(attendee => attendee.eventId && attendee.userId !== response.eventId && response.userId);
      this.updateAttendees(newAttendees);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async editEventById(eventId: string, userId: string, attendee: Attendee) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.patch<Attendee>(`/attendees/${eventId}/${userId}`, attendee);
      const newAttendees = this.attendeeService.attendees()?.map(attendee => attendee.eventId && attendee.userId === response.eventId && response.userId ? response : attendee);
      this.updateAttendees(newAttendees);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  private updateAttendees(newAttendees: Attendee[]) {
    this.data.set(newAttendees);
    this.attendeeService.updateAttendees(newAttendees);
    this.attendeeService.setLocalStorage(newAttendees);
  }

  async createEvent(attendee: AttendeeCreate) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<Attendee>(`/attendees`, attendee);
      const newEvents = [...this.attendeeService.attendees(), response];
      this.updateAttendees(newEvents);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
