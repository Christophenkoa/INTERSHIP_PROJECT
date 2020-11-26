import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from '../../../models/student/student.model';

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
      /*password : ['', Validators.required],*/
      tel : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      email : ['', [Validators.required, Validators.email]],
      date_Birth : ['', Validators.required],
      gender: ['', Validators.required],
      is_active : ['true', Validators.required],
      is_staff: ['false', Validators.required],
      is_superuser: ['false', Validators.required]
    });
  }

  OnSubmitForm() {
    /** Function which convert a string value to boolean **/
    function convert(value) {
      if (value === "true" || value === 'true') {
        return true;
      } else {
        return false;
      }
    }

    /** Function that generates a 10-character password **/
    function makePassword() {
      var text = '';
      var lettre = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#&$|+?!';

      for (var i = 0; i < 10; i++)
        text += lettre.charAt(Math.floor(Math.random() * lettre.length));

      return text;
    }
    const password = makePassword();

    if (this.registerForm.invalid) {return; }

    /** Retrieve values from the form **/
    const student = new StudentModel( this.registerForm.get('Regis_nbre').value,
                                      this.registerForm.get('name').value,
                                      this.registerForm.get('surname').value,
                                      password,
                                      this.registerForm.get('tel').value,
                                      this.registerForm.get('email').value,
                                      this.registerForm.get('date_Birth').value,
                                      this.registerForm.get('gender').value,
                                      convert(this.registerForm.get('is_active').value),
                                      convert(this.registerForm.get('is_staff').value),
                                      convert(this.registerForm.get('is_superuser').value));
  }

}
