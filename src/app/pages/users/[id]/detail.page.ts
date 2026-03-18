import {Component} from "@angular/core";
import {DetailUser} from "../../../components/users/detail-user/detail-user";

@Component({
  selector: 'app-detail-user-page',
  imports: [DetailUser],
  template: `
    <app-user-detail></app-user-detail>
  `,
})
export default class DetailUserPage {}
