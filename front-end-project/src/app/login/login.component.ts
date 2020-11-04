import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  hide = true;
  loginForm : FormGroup

  constructor(private formBuiler : FormBuilder) { }

  ngOnInit() {
    this.LoginForm();
    
  }

  LoginForm(){
    this.loginForm = this.formBuiler.group({
      username : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if(this.loginForm.invalid){return;}

    console.log(username +','+ password);
      
  }
}