// api-client.service.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
import { isPlatformBrowser } from '@angular/common';
import {PLATFORM_ID, Inject, Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth-service';
import {StatusCodes} from "http-status-codes"

@Injectable({
  providedIn: 'root',
})
export class ApiClientService<T> {
  private axiosInstance;
  private readonly isBrowser: boolean = false;

  router = inject(Router);
  authService = inject(AuthService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    let baseURL = '';

    if (isPlatformBrowser(this.platformId)) {
      // In the browser, use a relative path or proxy
      baseURL = '/api';
    } else {
      // On the server, use an absolute URL if needed (e.g., http://localhost:4000)
      baseURL = process.env['API_BASE_URL'] || 'http://localhost:5173/api';

    }

    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      withCredentials: true
    });

    // 2. Apply interceptors to this specific instance
    this.setupInterceptors();
  }


  public get<U>(url: string) {
    return this.axiosInstance.get<U>(url);
  }

  public post<U>(url: string, data: T) {
    return this.axiosInstance.post<U>(url, data);
  }

  public patch<U>(url: string, data: T) {
    return this.axiosInstance.patch<U>(url, data);
  }

  public delete<U>(url: string) {
    return this.axiosInstance.delete<U>(url);
  }

  private setupInterceptors(): void {
    // Request interceptor to add the auth token
    this.axiosInstance.interceptors.request.use(
     (config) => {
        if (this.isBrowser) { // Only access localStorage in the browser
          const accessToken = this.authService.accessToken;
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }else {
            this.router.navigate(['/login']);
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle 401 errors and redirect
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response && error.response.status === StatusCodes.UNAUTHORIZED) {
          if (this.isBrowser) {
            // Clear any invalid token/session data
            this.authService.removeSession();
            // Use Angular Router for navigation
            this.router.navigate(['/login']);
          }
          this.router.navigate(['/login']);
          // Reject the promise to stop further execution in the component's catch block
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }
}
