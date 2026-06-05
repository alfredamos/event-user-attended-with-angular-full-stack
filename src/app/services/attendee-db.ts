import {inject, Injectable, signal} from "@angular/core";
import {ApiHttpClientService} from "./api-http-client-service";
import {Attendee} from "../models/Attendee";
import {AttendeeService} from "./attendee-service";
import {AttendeeCreate} from "../../server/validations/attendee.validation";
import {AttendeeResponse} from "../../server/dto/attendeeRequest.dto";

@Injectable({providedIn: 'root'})
export class AttendeeDb {
  public data = signal<Attendee[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  attendeeService = inject(AttendeeService);
  apiHttpClientService = inject(ApiHttpClientService) as ApiHttpClientService<Attendee| AttendeeCreate | AttendeeResponse | null>;

  async deleteAttendeeById(eventId: string, userId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.delete<AttendeeResponse>(`/attendees/${eventId}/${userId}`);
      const newAttendees = this.attendeeService.attendees()?.filter(attendee => attendee.eventId !== response.eventId && attendee.userId !== response.userId);
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
      const response = await this.apiHttpClientService.patch<AttendeeResponse>(`/attendees/${eventId}/${userId}`, attendee);
      const newAttendees = this.attendeeService.attendees()?.map(attendee => attendee.eventId === response.eventId && attendee.userId === response.userId ? response : attendee);
      this.updateAttendees(newAttendees);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  private updateAttendees(newAttendees: AttendeeResponse[]) {
    this.data.set(newAttendees);
    this.attendeeService.updateAttendees(newAttendees);
    this.attendeeService.setLocalStorage(newAttendees);
  }

  async createAttendee(attendee: AttendeeCreate) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.apiHttpClientService.post<AttendeeResponse>(`/attendees`, attendee);
      const newEvents = [...this.attendeeService.attendees(), response];
      this.updateAttendees(newEvents);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
