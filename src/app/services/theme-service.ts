// src/app/theme.service.ts
import {inject, Injectable, signal} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import {BrowserStorageService} from "./browser-storage-service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<'light' | 'dark'>('light');
  browserStorage = inject(BrowserStorageService);


  constructor(@Inject(DOCUMENT) private document: Document) {
    // Initialize theme preference from local storage or system preference
    //const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || this.getSystemPreference();
    const savedTheme = this.browserStorage.get('theme') as 'light' | 'dark' || this.getSystemPreference();
    this.themeSignal.set(savedTheme);
    this.applyTheme(savedTheme);
  }

  toggleTheme() {
    const newTheme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.themeSignal.set(newTheme);
    this.applyTheme(newTheme);
    this.browserStorage.set("theme", newTheme)
    //localStorage.setItem('theme', newTheme);
  }

  private applyTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  private getSystemPreference(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
