import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {TeachersService} from '../../services/teacher/teachers.service';
import {CoursesService} from '../../services/courses/courses.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CuCoursePopupComponent} from './cu-course-popup/cu-course-popup.component';
import {GetcourseModel} from "../../models/course/getcourses.model";
import {Subject, Subscription} from "rxjs";
import {GetstudentModel} from "../../models/student/getstudent.model";


@Component({
  selector: 'app-course-crud',
  templateUrl: './course-crud.component.html',
  styleUrls: ['./course-crud.component.scss']
})
export class CourseCrudComponent implements OnInit {

  COURSE_DATA: MatTableDataSource<any>;
  courseArray: GetcourseModel[] = [];
  courseSubscription: Subscription;
  courseSubject = new Subject<GetcourseModel[]>();

  /* Table variables */
  displayedColumns: string[] = ['entitled', 'coefficient', 'teacher', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  /* End */

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeachersService,
              private courseService: CoursesService,
              private dialog: MatDialog,
              public infoBull: MatSnackBar) { }

  ngOnInit() {
    this.getCourses();
    this.GetAllCourse();
  }

  getCourses() {
    this.courseService.GetAllCourses()
      .subscribe(
        (data) => {console.log(data); },
        error => {console.log(error); }
      );
  }

  /* Table information and functions */
  applyFilter(filterValue: string) {
    this.COURSE_DATA.filter = filterValue.trim().toLowerCase();
  }

  /* Get all courses in Data base */
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

  /* Delete a course */
  DeleteCourse(idcourse) {
    console.log(idcourse);
    if (confirm('Are you sure to delete this course ?') === true) {
      this.courseService.DeleteCourse(idcourse)
        .subscribe(result => {
          this.courseArray = [];
          this.GetAllCourse();
          console.log(result);
        }, error => console.log(error));
    }
  }

  OpenCreateMethod() {
    const dialog = this.dialog.open(CuCoursePopupComponent, {
      width : '30%',
      height : '65%',
      disableClose : true
    });
    dialog.afterClosed()
      .subscribe(data => {
         this.infoBull.open(data.course + ' has been created !', 'Close', {
           duration: 3000
         });
      }, error => console.log(error));
  }

  OpenUpdateMethod(CourseData) {
    const dialog = this.dialog.open(CuCoursePopupComponent, {
      width : '30%',
      height : '65%',
      disableClose : true,
      data : CourseData
    });
    dialog.afterClosed()
      .subscribe(data => {
        this.infoBull.open(data.course + ' has been updated !', 'Close', {
          duration: 3000
        });
      }, error => console.log(error));
  }
}
