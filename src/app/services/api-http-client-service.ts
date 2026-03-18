import {Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiHttpClientService<T> {
  private httpClient = inject(HttpClient)
  private baseUrl = "http://localhost:5173/api"

  public async get<U>(url: string) {
    const response$ = this.httpClient.get<U>(`${this.baseUrl}${url}`);
    return firstValueFrom(response$);

  }

  public async post<U>(url: string, data: T) {
    const response$ = this.httpClient.post<U>(`${this.baseUrl}${url}`, data);
    return firstValueFrom(response$);
  }

  public async patch<U>(url: string, data: T) {
    const response$ = this.httpClient.patch<U>(`${this.baseUrl}${url}`, data);
    return firstValueFrom(response$);
  }


  public async delete<U>(url: string) {
    const response$ = this.httpClient.delete<U>(`${this.baseUrl}${url}`);
    return firstValueFrom(response$);
  }

}
