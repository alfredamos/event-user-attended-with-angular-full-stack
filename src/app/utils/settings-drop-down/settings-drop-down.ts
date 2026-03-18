import {Component, computed, inject, OnInit, output, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth-service";
import {AuthDb} from "../../services/auth-db";

@Component({
  selector: 'app-settings-drop-down',
  imports: [
    RouterLink
  ],
  templateUrl: './settings-drop-down.html',
  styleUrl: './settings-drop-down.css',
  standalone: true
})
export class SettingsDropDown implements OnInit{
  idOfUser = signal("")
  authService = inject(AuthService);
  authDb = inject(AuthDb)
  userId = computed(() =>  this.authService.userCurrent()?.id as string);

  onRefreshUserToken = output<void>();

  async ngOnInit(){
    const userId = await this.getCurrentUser();
    this.idOfUser.set(userId);
  }

  refreshUserToken() {
    this.onRefreshUserToken.emit();
  }

  async getCurrentUser(){
    const currentUser = await this.authDb.getCurrentUser();

    return this.userId() ?? currentUser?.id
  }
}
