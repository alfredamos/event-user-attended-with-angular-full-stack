import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationBar} from "./utils/navigation-bar/navigation-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar],
  templateUrl: './app.html',
  standalone: true
})
export class App {}
