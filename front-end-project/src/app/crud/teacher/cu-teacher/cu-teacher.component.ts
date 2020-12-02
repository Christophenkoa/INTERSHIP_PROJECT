import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TeacherModel } from '../../../models/teacher/teacher.model';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cu-teacher',
  templateUrl: './cu-teacher.component.html',
  styleUrls: ['./cu-teacher.component.scss']
})
export class CuTeacherComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;

  constructor(private formBuiler: FormBuilder,
              private teacherService: TeachersService,
              public infoBull: MatSnackBar,
              public dialogRef: MatDialogRef<CuTeacherComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.RegisterForm();
    if(this.data){
      this.registerForm.setValue({
        username: this.data.username,
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        tel: this.data.tel,
        email: this.data.email,
        gender: this.data.gender,
        is_active: this.data.is_active,
        is_staff: this.data.is_staff,
        is_superuser: this.data.is_superuser
      });
    }
    console.log(this.data.id);
  }

  RegisterForm() {
    this.registerForm = this.formBuiler.group({
      username : ['', Validators.required],
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      tel : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      email : ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      is_active : ['true', Validators.required],
      is_staff: ['true', Validators.required],
      is_superuser: ['false', Validators.required]
    });
  }

  OnSubmitForm() {
    /** Function which convert a string value to boolean **/
    function convert(value) {
      if (value === "true" || value === 'true'){
        return true;
      }else {
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

    if(this.registerForm.invalid) {return;}
    /** Retrieve values from the form **/
    const teacher = new TeacherModel( this.registerForm.get('username').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      password,
                                      this.registerForm.get('tel').value,
                                      this.registerForm.get('email').value,
                                      this.registerForm.get('gender').value,
                                      convert(this.registerForm.get('is_active').value),
                                      convert(this.registerForm.get('is_staff').value),
                                      convert(this.registerForm.get('is_superuser').value)
                                    );
<<<<<<< HEAD
    // console.log(this.registerForm.get('first_name').value + ' ; ' + this.registerForm.get('last_name').value);
=======
    console.log(teacher);
>>>>>>> cc598027ce59d1d0e391bb3a1b04839f2da870de
    this.teacherService.CreateTeacher(teacher)
      .subscribe(data => {
          console.log(data);
        },
        error => {
          console.log(error);
          this.infoBull.open('Creation Error', 'Close', {
            duration: 2000
          });
        });
  }

  UpdateForm(){

    if(this.registerForm.invalid) {return;}
    const teacherUpdated = new TeacherModel( this.registerForm.get('username').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      this.data.password,
                                      this.registerForm.get('tel').value,
                                      this.registerForm.get('email').value,
                                      this.registerForm.get('gender').value,
                                      this.registerForm.get('is_active').value,
                                      this.registerForm.get('is_staff').value,
                                      this.registerForm.get('is_superuser').value
    );
    // console.log("Oui, c'est bon " + typeof(this.registerForm.get('is_active').value));
    this.teacherService.UpdateTeacher(teacherUpdated, this.data.id)
      .subscribe(data => console.log(data),
        error => console.log(error));
  }

}
