import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cu-teacher',
  templateUrl: './cu-teacher.component.html',
  styleUrls: ['./cu-teacher.component.scss']
})
export class CuTeacherComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;

  constructor(private formBuiler: FormBuilder) { }

  ngOnInit() {
    this.RegisterForm();
  }

  RegisterForm() {
    this.registerForm = this.formBuiler.group({
      username : ['', Validators.required],
      name : ['', Validators.required],
      surname : ['', Validators.required],
      password : ['', Validators.required],
      tel : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      email : ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      is_active : ['', Validators.required],
      is_staff: ['', Validators.required],
      is_superuser: ['', Validators.required]
    });
  }

  OnSubmitForm() {
    /** Retrieve values from the form **/
    const username = this.registerForm.get('username').value;
    const name = this.registerForm.get('name').value;
    const surname = this.registerForm.get('surname').value;
    const password = this.registerForm.get('password').value;
    const tel = this.registerForm.get('tel').value;
    const email = this.registerForm.get('email').value;
    const gender = this.registerForm.get('gender').value;
    const active = convert(this.registerForm.get('is_active').value);
    const staff = convert(this.registerForm.get('is_staff').value);
    const superuser = convert(this.registerForm.get('is_superuser').value);

    /** Function which convert a string value to boolean **/
    function convert(value) {
      if (value === "true" || value === 'true'){
        return true;
      }else {
        return false;
      }
    }
    /** Function that generates a 10-character password **/
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#&$|+";

      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
    const pass = makeid();

    console.log(pass);
    alert("your password is " +pass);

    if(this.registerForm.invalid) {return;}
    console.log(username + ',' + name + ',' + surname + ',' + password + ',' + tel + ',' + email + ',' +  gender + ',' + active + ',' + staff + ',' + superuser);
    console.log(typeof active);
  }

}
