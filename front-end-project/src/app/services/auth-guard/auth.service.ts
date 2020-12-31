import {EventEmitter, Injectable, OnInit} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import {Observable, Subscription, throwError} from 'rxjs';


import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authentication = new EventEmitter<boolean>();
  tokenSubscription = new Subscription();
  user: User = null;
  httpHeaders = null;
  timeout;

  constructor(public jwtHelper: JwtHelperService,
              private userManager: UserManagerService,
              private router: Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log('' + token);
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    this.userManager.authenticate(username, password).subscribe(
      result => {

        const loginResult = result as Token;

        this.httpHeaders = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'JWT ' + loginResult.token });

        console.log(result);
        this.authentication.emit(true);
        localStorage.setItem('auth', '' + true);

        // Here we are storing the token and refresh token in the localstorage
        localStorage.setItem('token', loginResult.token);

        const decoded = jwt_decode<JwtPayload>(loginResult.token);
        console.log(decoded);

        localStorage.setItem('expire_time', '' + decoded.exp);
        this.timeout = decoded.exp;

        this.user = loginResult.user;
        localStorage.setItem('id', '' + this.user.id);
        localStorage.setItem('username', '' + this.user.username);
        localStorage.setItem('is_superuser', '' + this.user.is_superuser);
        localStorage.setItem('is_staff', '' + this.user.is_staff);
        localStorage.setItem('is_active', '' + this.user.is_active);

        this.router.navigate(['/quiz']);
      },

      error => {
        console.log(error);
      }
    );
  }
  logout() {
    this.tokenSubscription.unsubscribe();
    this.authentication.emit(false);
    this.router.navigate(['/login']);

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('auth');
    localStorage.removeItem('expire_time');
    localStorage.removeItem('is_superuser');
    localStorage.removeItem('is_staff');
    localStorage.removeItem('is_active');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
  }
interface JwtPayload {
  exp: number;
  user_id: number;
  username: string;
}

interface Token {
  token: string;
  user: User;
}

interface User {
  id: number;
  username: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
}

import {
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import {catchError, delay, finalize} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {UserManagerService} from '../user/user-manager.service';

// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    delay(10000);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          // 401 handled in auth.interceptor
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
