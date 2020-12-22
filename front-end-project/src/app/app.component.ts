import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from './services/auth-guard/auth.service';
import Swal from 'sweetalert2';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end-project';

  auth = false;

  // http options used for making API calls
  // private httpOptions: any;

  /*// the actual JWT token
  public token: string;
  loginData;
  userData;
  role;
  // the token expiration date
  public token_expires: Date;*/

/*  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];*/


  constructor(private authGuard: AuthGuardService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth = localStorage.getItem('auth') != null;
    this.authService.authentication.subscribe(
      (data) => {this.auth = data; console.log(data); }
    );
  }
}
