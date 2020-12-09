import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {PeriodicElement} from '../add-note/add-note.component';
import { CourseModel } from '../../models/course/courses.model';
import {TeacherModel} from '../../models/teacher/teacher.model';
import {TeachersService} from '../../services/teacher/teachers.service';
import {CoursesService} from '../../services/courses/courses.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GetcourseModel} from '../../models/course/getcourses.model';


@Component({
  selector: 'app-course-crud',
  templateUrl: './course-crud.component.html',
  styleUrls: ['./course-crud.component.scss']
})
export class CourseCrudComponent implements OnInit {

  CourseForm: FormGroup;
  COURSE_DATA: MatTableDataSource<any>;
  update = false;
  idarea: number[] = [];

  courses: string[] = [
    'English', 'French', 'Chemistry', 'Physic', 'Mathematic',
    'EPS', 'PCT', 'Deutsch', 'Spanish', 'History', 'Geographic'
  ];
  teachers: TeacherModel[] = [];

  /* Table variables */
  displayedColumns: string[] = ['entitled', 'coefficient', 'teacher', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  /* End */

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeachersService,
              private courseService: CoursesService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.GetAllCourse();
    this.TakeValue();
    this.GetAllTeachers();
  }

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
                                    this.idarea
    );

    this.courseService.CreateCourse(courses)
      .subscribe((data: CourseModel) => {
          console.log(data);
          this.snackbar.open(data.entitled + ' has been created !', 'Close', {
            duration: 2500,
          });
        },
        error => console.log(error));
  }


  /* Table information and functions */
  applyFilter(filterValue: string) {
    this.COURSE_DATA.filter = filterValue.trim().toLowerCase();
  }

  /* Get all teachers in Data base */
  GetAllTeachers() {
    this.teacherService.GetAllTeacher()
      .subscribe((data) => {
        this.teachers = data;
      }, (error => console.log(error)));
  }

  /* Get all courses in Data base */
  GetAllCourse() {
    this.courseService.GetAllCourses()
      .subscribe((data ) => {
        console.log(data);
        this.COURSE_DATA = new MatTableDataSource(data);
        this.COURSE_DATA.paginator = this.paginator;
      }, error => console.log(error));
  }

  /* Delete a course */
  DeleteCourse(idcourse) {
    console.log(idcourse);
    if (confirm('Are you sure to delete this course ?') === true) {
      this.courseService.DeleteCourse(idcourse)
        .subscribe(result => {
          console.log(result);
        }, error => console.log(error));
    }
  }

}
