import {Component, input} from "@angular/core";
import {DetailUser} from "../../../components/users/detail-user/detail-user";

@Component({
  selector: 'app-detail-user-page',
  imports: [DetailUser],
  template: `
    <app-user-detail [userId]="id()"></app-user-detail>
  `,
})
export default class DetailUserPage {
  id = input.required<string>();
}
