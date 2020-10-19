import { Component } from '@angular/core';
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  users = [{username:'chris@237'}, {username: 'perle212'}];

  constructor(private api: ApiService) {
    this.getAllUsers();
  }

  getAllUsers = () => {
    this.api.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
