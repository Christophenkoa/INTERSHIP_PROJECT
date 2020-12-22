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

  // private apiRoot = 'http://localhost:8000/auth/';
  //
  // // the token expiration date
  // public token_expires: Date;
  //
  // // the username of the logged in user
  // public username: string;
  //
  // @ts-ignore
  httpHeaders = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem('token') });

  // login_url = 'http//127.0.0.1:8000/auth/login';
  // private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log('' + token);
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('auth');
    localStorage.removeItem('refresh');
    localStorage.clear();
  }

  get token(): string {
    return localStorage.getItem('token');
  }

//   private setSession(authResult) {
//     const token = authResult.token;
//     const payload = jwt_decode<JWTPayload>(token);
//     const expiresAt = moment.unix(payload.exp);
//
//     localStorage.setItem('token', authResult.token);
//     localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
//   }
//
//   get token(): string {
//     return localStorage.getItem('token');
//   }
//
//   login(username: string, password: string) {
//     return this.http.post(
//       this.apiRoot.concat('login/'),
//       { username, password }
//     ).pipe(
//       tap(response => this.setSession(response)),
//       shareReplay(),
//     );
//   }
//
//   loggedIn() {
//     return sessionStorage.getItem('token');
//   }
//
//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expires_at');
//   }
//
//   getToken() {
//     return sessionStorage.getItem('token');
//   }
//
//   refreshToken() {
//     if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
//       return this.http.post(
//         this.apiRoot.concat('login/'),
//         { token: this.token }
//       ).pipe(
//         tap(response => this.setSession(response)),
//         shareReplay(),
//       );
//     }
//   }
//
//   getExpiration() {
//     const expiration = localStorage.getItem('expires_at');
//     const expiresAt = JSON.parse(expiration);
//
//     return moment(expiresAt);
//   }
//
//   isLoggedIn() {
//     return moment().isBefore(this.getExpiration());
//   }
//
//   isLoggedOut() {
//     return !this.isLoggedIn();
//   }
// }
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', 'JWT '.concat(token))
//       });
//
//       return next.handle(cloned);
//     } else {
//       return next.handle(req);
//     }
//   }
// }
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//
//   constructor(private authService: AuthService, private router: Router) { }
//
//   canActivate() {
//     if (this.authService.isLoggedIn()) {
//       this.authService.refreshToken();
//
//       return true;
//     } else {
//       this.authService.logout();
//       this.router.navigate(['login']);
//       Swal.fire({
//         position: 'center',
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please login',
//         showConfirmButton: false,
//         timer: 2000
//       });
//
//       return false;
//     }
//   }
// }
//
// interface JWTPayload {
//   user_id: number;
//   username: string;
//   email: string;
//   exp: number;
}
