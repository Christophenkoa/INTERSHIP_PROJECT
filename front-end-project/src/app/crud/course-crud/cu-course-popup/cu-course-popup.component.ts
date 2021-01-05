import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeacherModel} from '../../../models/teacher/teacher.model';
import {CourseModel} from '../../../models/course/courses.model';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {CoursesService} from '../../../services/courses/courses.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-cu-course-popup',
  templateUrl: './cu-course-popup.component.html',
  styleUrls: ['./cu-course-popup.component.scss']
})
export class CuCoursePopupComponent implements OnInit {
  CourseForm: FormGroup;
  update = false;
  idarea: number[] = [];
  filteredOptions: Observable<string[]>;

  courses: string[] = [
    'English', 'French', 'Chemistry', 'Physic', 'Mathematic',
    'EPS', 'PCT', 'Deutsch', 'Spanish', 'History', 'Geographic',
    'Citizenship'
  ];
  teachers: TeacherModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeachersService,
              private courseService: CoursesService,
              private dialogRef: MatDialogRef<CuCoursePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public coursedata: any,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.TakeValue();
    this.GetAllTeachers();
    console.log(this.coursedata);
    if (this.coursedata) {
      this.CourseForm.setValue({
        course : this.coursedata.entitled,
        coef : this.coursedata.coefficient,
        teacher_id : this.coursedata.course_teacher
      });
    } else {
      return;
    }
    this.FilterMethod();
  }

  FilterMethod() {
    /* Autocompletion */
    this.filteredOptions = this.CourseForm.get('course').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    /* End */
  }
  /* Autocompletion too */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.courses.filter(option => option.toLowerCase().includes(filterValue));
  }
  /* End */

  TakeValue() {
    this.CourseForm = this.formBuilder.group({
      course: ['', Validators.required],
      coef: ['', [Validators.required, Validators.max(6), Validators.min(1)]],
      teacher_id: ['', Validators.required]
    });
  }

  OnSubmitForm() {
    if (this.CourseForm.invalid) {return; }

    console.log(
      this.CourseForm.
      get('course').value + ' , ' + this.CourseForm.get('coef').value + ' , ' + this.CourseForm.get('teacher_id').value
    );
    this.idarea.push(this.CourseForm.get('teacher_id').value);
    const courses = new CourseModel(this.CourseForm.get('course').value,
      this.CourseForm.get('coef').value,
      this.CourseForm.get('teacher_id').value
    );

    this.courseService.CreateCourse(courses)
      .subscribe((data: CourseModel) => {
           console.log(data);
         /* this.snackbar.open(data.entitled + ' has been created !', 'Close', {
            duration: 2500,
          });*/
        },
        error => console.log(error));
  }

  OnUpdateForm() {
    if (this.CourseForm.invalid) {return;}

    console.log(
      this.CourseForm.
      get('course').value + ' , ' + this.CourseForm.get('coef').value + ' , ' + this.CourseForm.get('teacher_id').value
    );
    this.idarea.push(this.CourseForm.get('teacher_id').value);
    const courses = new CourseModel(this.CourseForm.get('course').value,
                                    this.CourseForm.get('coef').value,
                                    this.CourseForm.get('teacher_id').value);

    this.courseService.UpdateCourse(this.coursedata.id, courses)
      .subscribe((data) => {
        console.log(data);
      }, error => console.log(error));
  }

  /* Get all teachers in Data base */
  GetAllTeachers() {
    this.teacherService.GetAllTeacher()
      .subscribe((data) => {
        this.teachers = data;
      }, (error => console.log(error)));
  }

  ClosePopup() {
    this.dialogRef.close();
  }

}
