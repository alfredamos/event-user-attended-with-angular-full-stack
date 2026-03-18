import {Component, inject} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SettingsDropDown} from '../settings-drop-down/settings-drop-down';
import {AdminDropDown} from '../admin-drop-down/admin-drop-down';
import {AuthDb} from "../../services/auth-db";
import {AuthService} from "../../services/auth-service";
import {ThemeService} from "../../services/theme-service";
import {ThemeService2} from "../../services/theme-service2";

@Component({
  selector: 'app-navigation-bar',
  imports: [
    NgClass,
    RouterLink,
    SettingsDropDown,
    AdminDropDown
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
  standalone: true
})
export class NavigationBar{
  authDb = inject(AuthDb)
  authService = inject(AuthService);
  themeService = inject(ThemeService2)

  isMenuOpen = false;

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  themeToggle() {
    this.themeService.toggleTheme();
  }

  async onLogout() {
    await this.authDb.logoutUser()
  }

  async refreshUserToken(){
    await this.authDb.refreshUserToken()
  }
}
