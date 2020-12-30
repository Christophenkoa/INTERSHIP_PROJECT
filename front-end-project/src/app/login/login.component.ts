import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth-guard/auth.service';
import {UserManagerService} from '../services/user/user-manager.service';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  error: any;
  user: User = null;


  constructor(private formBuiler: FormBuilder,
              private authService: AuthService,
              private userManager: UserManagerService,
              private router: Router) { }

  ngOnInit() {
    this.LoginForm();
  }

  LoginForm() {
    this.loginForm = this.formBuiler.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.invalid) { return; }

    console.log(username + ',' + password);

    this.userManager.authenticate(username, password).subscribe(
      result => {

        const loginResult = result as Token;

        console.log(result);
        this.authService.authentication.emit(true);
        localStorage.setItem('auth', '' + true);

        // Here we are storing the token and refresh token in the localstorage
        localStorage.setItem('token', loginResult.token);

        const decoded = jwt_decode<JwtPayload>(loginResult.token);
        localStorage.setItem('expire_time', '' + decoded.exp);

        this.user = loginResult.user;
        localStorage.setItem('id', '' + this.user.id);
        localStorage.setItem('username', '' + this.user.username);
        localStorage.setItem('is_superuser', '' + this.user.is_superuser);
        localStorage.setItem('is_staff', '' + this.user.is_staff);
        localStorage.setItem('is_active', '' + this.user.is_active);

        console.log(decoded);
        this.router.navigate(['/quiz']);
      },

      error => {
        console.log('error');
      }
    );
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
