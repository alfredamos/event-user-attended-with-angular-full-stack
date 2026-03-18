import { Component } from '@angular/core';

import { AnalogWelcome } from './analog-welcome';

@Component({
  selector: 'app-home',
  imports: [AnalogWelcome],
  template: `
     <div>Home Page</div>
  `,
})
export default class Home {}
