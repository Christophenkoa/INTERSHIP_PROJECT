import { Injectable } from '@angular/core';
import {Subscriber, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = true;
  authSubj = new Subject<boolean>();
  constructor() { }


  Login() {
    this.authSubj.next(true);
  }
   Logout() {
    this.auth = false;
    this.authSubj.next(false);
   }
}
