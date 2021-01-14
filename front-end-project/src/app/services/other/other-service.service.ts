import {Injectable, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subject, Subscription} from 'rxjs';
import {TeacherModel} from '../../models/teacher/teacher.model';
import {MatPaginator} from '@angular/material/paginator';
import {TeachersService} from '../teacher/teachers.service';
import {GetstudentModel} from "../../models/student/getstudent.model";
import {StudentsService} from "../student/students.service";
import {GetcourseModel} from "../../models/course/getcourses.model";
import {CoursesService} from "../courses/courses.service";

@Injectable({
  providedIn: 'root'
})
export class OtherServiceService {
  /* TEACHER VARIABLES */
  TEACHER_DATA: MatTableDataSource<any>;
  teacherSubscription: Subscription;
  teacherArray: TeacherModel[] = [];
  teacherSubject = new Subject<TeacherModel[]>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  /* END */
  /* STUDENT VARIABLES */
  STUDENT_DATA: MatTableDataSource<any>;
  studentArray: GetstudentModel[] = [];
  studentSubscription: Subscription;
  studentSubject = new Subject<GetstudentModel[]>();
  /* END */
  /* COURSE VARIABLES */
  COURSE_DATA: MatTableDataSource<any>;
  courseArray: GetcourseModel[] = [];
  courseSubscription: Subscription;
  courseSubject = new Subject<GetcourseModel[]>();
  /* END */
  constructor(private teacherService: TeachersService,
              private studentService: StudentsService,
              private courseService: CoursesService) { }
  /* Update the table after create, update and delete operation */
  GetAllTeacher() {
    /* Call function for take all teachers */
    this.teacherSubscription = this.teacherService.GetAllTeacher()
      .subscribe(
        (data) => {
          this.teacherArray = [];
          for (var i= 0; i < data.length; i++) {
            this.teacherArray.push(data[i]);
          }
          this.TEACHER_DATA = new MatTableDataSource(this.teacherArray);
          this.TEACHER_DATA.paginator = this.paginator;
          console.log(this.TEACHER_DATA);
        }, (error => console.log(error))
      );
    this.teacherSubject.next(this.teacherArray);
  }
  /* End */
  /* Update the table after create, update and delete operation */
  GetAllStudents() {
    this.studentSubscription = this.studentService.GetAllStudent()
      .subscribe(
        (data) => {
          this.studentArray = [];
          for (var i= 0;i < data.length; i++) {
            this.studentArray.push(data[i]);
          }
          // console.log(data);
          this.STUDENT_DATA = new MatTableDataSource(this.studentArray);
          this.STUDENT_DATA.paginator = this.paginator;
        }, (error => console.log(error)));
    this.studentSubject.next(this.studentArray);
  }
  /* End */
  /* Update the table after create, update and delete operation */
  GetAllCourse() {
    this.courseSubscription = this.courseService.GetAllCourses()
      .subscribe((data ) => {
        for (var i= 0;i < data.length; i++) {
          this.courseArray.push(data[i]);
        }
        console.log(data);
        this.COURSE_DATA = new MatTableDataSource(this.courseArray);
        this.COURSE_DATA.paginator = this.paginator;
      }, error => console.log(error));
    this.courseSubject.next(this.courseArray);
  }
  /* END */
}
