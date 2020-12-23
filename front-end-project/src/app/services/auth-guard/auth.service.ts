import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import {Observable, Subject} from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

// import * as jwtDecode from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import Swal from 'sweetalert2';


import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authentication = new EventEmitter<boolean>();

  // @ts-ignore
  httpHeaders = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'JWT ' + this.getToken() });

  constructor(public jwtHelper: JwtHelperService, private router: Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log('' + token);
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('auth');
    localStorage.removeItem('expire_time');
    this.authentication.emit(false);
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getAccesLevel() {
    // implement
  }
}
