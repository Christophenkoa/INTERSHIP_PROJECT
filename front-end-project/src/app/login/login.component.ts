import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth-guard/auth.service';
import {UserManagerService} from '../services/user/user-manager.service';

import jwt_decode from 'jwt-decode';
import {of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  error: any;


  constructor(private formBuiler: FormBuilder,
              private authService: AuthService) { }

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

    this.authService.login(username, password);
  }
}
