import {
  HttpInterceptorFn,
  HttpRequest, HttpHandlerFn
} from '@angular/common/http';
import { BrowserStorageService } from '../services/browser-storage-service';
import { inject } from '@angular/core';
import { LocalStorageKey } from '../models/LocalStorageKey';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  //----> Get the auth from local storage.
  const localStorageService = inject(BrowserStorageService);

  //----> Clone the request to add credentials (cookies/sessions) and headers
  const clonedRequest = req.clone({
    withCredentials: true, // Enables sending cookies
    setHeaders: {
      Authorization: `Bearer ${localStorageService.get(LocalStorageKey.authKey) || ''}`, // Example token
    },
  });

  return next(clonedRequest);
};
