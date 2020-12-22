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

  /*logout() {
    // (<HTMLInputElement>document.getElementById("email-field")).value='';
    // (<HTMLInputElement>document.getElementById("pass-field")).value='';
    this.authService.logout();
    this.refresh();
  }
  refresh(): void {
    window.location.reload();
  }
  logins() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  refreshToken() {
    this.authService.refreshToken().subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  tokeniser() {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }*/

}
