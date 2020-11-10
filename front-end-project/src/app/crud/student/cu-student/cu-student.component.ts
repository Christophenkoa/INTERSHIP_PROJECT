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

    if(this.registerForm.invalid){return;}
    console.log('Hello World !!');
  }

}
