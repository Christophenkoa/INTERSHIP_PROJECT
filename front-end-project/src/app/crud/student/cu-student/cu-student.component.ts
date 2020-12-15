import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from '../../../models/student/student.model';
import { StudentsService } from '../../../services/student/students.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClassService} from '../../../services/classes/class.service';
import {GetClassesModel} from '../../../models/class/getclasses.models';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-cu-student',
  templateUrl: './cu-student.component.html',
  styleUrls: ['./cu-student.component.scss']
})
export class CuStudentComponent implements OnInit {

  registerForm: FormGroup;
  classArray: GetClassesModel[] = [];
  classTaken: GetClassesModel;
  idCourse: number[] = [];
  dateofBirth: string;

  constructor(private formBuiler: FormBuilder,
              private studentsService: StudentsService,
              private classeService: ClassService,
              private infobull: MatSnackBar,
              /*public datepipe: DatePipe,*/
              private dialogRef: MatDialogRef<CuStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public Studentdata: any) { }

  ngOnInit() {
    this.RegisterStudentForm();
    this.GetAllClasses();
    if (this.Studentdata) {
      this.registerForm.setValue({
        regis_number : this.Studentdata.regis_number,
        first_name : this.Studentdata.first_name,
        last_name : this.Studentdata.last_name,
        tel : this.Studentdata.tel,
        my_class : this.Studentdata.my_class,
        dateOfBirth : this.Studentdata.dateOfBirth,
        gender : this.Studentdata.gender,
        is_active : this.Studentdata.is_active,
        is_staff : this.Studentdata.is_staff,
        is_superuser : this.Studentdata.is_superuser,
      });
    } else {
      return;
    }
  }

  RegisterStudentForm() {
    this.registerForm = this.formBuiler.group({
      regis_number : ['', Validators.required],
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      tel : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      my_class: ['', Validators.required],
      dateOfBirth : ['', Validators.required],
      gender: ['', Validators.required],
      is_active : ['true', Validators.required],
      is_staff: ['false', Validators.required],
      is_superuser: ['false', Validators.required]
    });
  }

  /* Function that send student information to back end */
  OnSubmitForm() {
    /* Function which convert a string value to boolean */
    function convert(value) {
      if (value === "true" || value === 'true') {
        return true;
      } else {
        return false;
      }
    }

    /* Function that generates a 10-character password */
    function makePassword() {
      var text = '';
      var lettre = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#&$|+?!';

      for (var i = 0; i < 10; i++)
        text += lettre.charAt(Math.floor(Math.random() * lettre.length));

      return text;
    }
    const password = makePassword();
    /* End */

    if (this.registerForm.invalid) {return; }

    this.classTaken = this.registerForm.get('my_class').value;

    for (var i = 0; i < this.classTaken.all_courses.length; i++) {
      this.idCourse.push(this.classTaken.all_courses[i].id);
    }

    this.dateofBirth = moment(this.registerForm.get('dateOfBirth').value).format('YYYY-MM-DD');

    console.log(this.registerForm.get('dateOfBirth').value);
    console.log(this.classTaken.id + ' , ' + this.idCourse);
    /* Retrieve values from the form */
    const student = new StudentModel( this.registerForm.get('regis_number').value,
                                      this.registerForm.get('regis_number').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      password,
                                      this.registerForm.get('tel').value,
                                      this.dateofBirth,
                                      this.registerForm.get('gender').value,
                                      convert(this.registerForm.get('is_active').value),
                                      convert(this.registerForm.get('is_staff').value),
                                      convert(this.registerForm.get('is_superuser').value),
                                      this.classTaken.id,
                                      this.idCourse);
    console.log(student);
    /* Send informations */
    this.studentsService.CreateStudent(student)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }


  /* Update function  */
  OnUpdateForm() {
    if (this.registerForm.invalid) { return; }

    function convert(value) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else if (value === false) {
        return false;
      } else if (value === true) {
        return true;
      }
    }

    /* Retrieve values from the form */
    const student = new StudentModel( this.registerForm.get('regis_number').value,
                                      this.registerForm.get('regis_number').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      this.Studentdata.password,
                                      this.registerForm.get('tel').value,
                                      this.registerForm.get('dateOfBirth').value,
                                      this.registerForm.get('gender').value,
                                      convert(this.registerForm.get('is_active').value),
                                      convert(this.registerForm.get('is_staff').value),
                                      convert(this.registerForm.get('is_superuser').value),
                                      this.classTaken.id,
                                      this.idCourse);

    this.classTaken = this.registerForm.get('my_class').value;

    for (var i = 0; i < this.classTaken.all_courses.length; i++) {
      this.idCourse.push(this.classTaken.all_courses[i].id);
    }

    this.studentsService.UpdateStudent(student, this.Studentdata.id)
      .subscribe();
  }

  GetAllClasses() {
    this.classeService.GetAllClasses()
      .subscribe(data => {
        this.classArray = data;
        console.log(data);
      }, error => console.log(error));
  }

  ClosePopup() {
    this.dialogRef.close();
  }

}
