import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from './services/auth-guard/auth.service';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end-project';
  auth = true;
  authSubs: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    /*this.authSubs = this.authService.authSubj.subscribe(
      (val: boolean) => {
        this.auth = val;
      }
    );*/

  }


}
