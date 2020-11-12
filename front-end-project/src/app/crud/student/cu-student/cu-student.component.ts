import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cu-student',
  templateUrl: './cu-student.component.html',
  styleUrls: ['./cu-student.component.scss']
})
export class CuStudentComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;

  constructor(private formBuiler: FormBuilder) { }

  ngOnInit() {
    this.RegisterForm();
  }

  RegisterForm() {
    this.registerForm = this.formBuiler.group({
      Regis_nbre : ['', Validators.required],
      name : ['', Validators.required],
      surname : ['', Validators.required],
      password : ['', Validators.required],
      tel : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      email : ['', [Validators.required, Validators.email]],
      date_Birth : ['', Validators.required],
      gender: ['', Validators.required],
      is_active : ['', Validators.required],
      is_staff: ['', Validators.required],
      is_superuser: ['', Validators.required]
    });
  }

  OnSubmitForm(){
    /** Retrieve values from the form **/
    const regis = this.registerForm.get('Regis_nbre').value;
    const name = this.registerForm.get('name').value;
    const surname = this.registerForm.get('surname').value;
    const password = this.registerForm.get('password').value;
    const tel = this.registerForm.get('tel').value;
    const email = this.registerForm.get('email').value;
    const date = this.registerForm.get('date_Birth').value;
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
    if(this.registerForm.invalid) {return;}
    console.log(regis + ',' + name + ',' + surname + ',' + password + ',' + tel + ',' + email + ',' + date + ',' + gender + ',' + active + ',' + staff + ',' + superuser);
    console.log(typeof active);
  }

}
