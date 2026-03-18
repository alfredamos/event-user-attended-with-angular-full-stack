import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'app-admin-drop-down',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-drop-down.html',
  styleUrl: './admin-drop-down.css',
  standalone: true
})
export class AdminDropDown {
  authService = inject(AuthService);
}
