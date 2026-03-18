// src/app/core/services/theme.service.ts
import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService2 {
  private isBrowser = isPlatformBrowser(this.platformId);
  private theme = signal<'light' | 'dark'>('light'); // Default theme

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (this.isBrowser) {
      // Initialize theme from localStorage on the client side
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Use system preference if no saved theme
        this.setTheme('dark');
      }
    }
  }

  // Function to set the theme and update the DOM and localStorage
  setTheme(theme: 'light' | 'dark'): void {
    this.theme.set(theme);
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }
    }
    // In a full SSR implementation, the server should read the cookie to set the initial class.
  }

  toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  get currentTheme() {
    return this.theme();
  }
}
