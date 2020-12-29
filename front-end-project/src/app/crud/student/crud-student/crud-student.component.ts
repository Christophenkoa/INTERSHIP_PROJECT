import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTableDataSource, MatDialogRef} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {CuStudentComponent} from '../cu-student/cu-student.component';
import { MatDialogConfig } from '@angular/material';
import { StudentModel } from '../../../models/student/student.model';
import {StudentsService} from '../../../services/student/students.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GetstudentModel} from "../../../models/student/getstudent.model";
import {Subject, Subscription} from "rxjs";


@Component({
  selector: 'app-crud-student',
  templateUrl: './crud-student.component.html',
  styleUrls: ['./crud-student.component.scss']
})
export class CrudStudentComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private studentService: StudentsService,
              public infoBull: MatSnackBar) { }

  /* Differents columns of the table */
  studentColumns: string[] = ['regis_number', 'first_name', 'last_name', 'tel', 'dateOfBirth', 'gender', 'my_class', 'is_active', 'is_superuser', 'is_staff', 'actions'];
  STUDENT_DATA: MatTableDataSource<any>;
  studentArray: GetstudentModel[] = [];
  studentSubscription: Subscription;
  studentSubject = new Subject<GetstudentModel[]>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /* Filter the information in DataTable */
  applyFilter(filterValue: string) {
    this.STUDENT_DATA.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.GetAllStudents();
  }

  /* Open the CU(Create and Update) interface */
  OpenCreateMethod() {
    const dialog = this.dialog.open(CuStudentComponent, {
      width : '40%',
      height : '70%',
      disableClose : true
    });
    dialog.afterClosed()
      .subscribe(data => {
        if (data) {
          console.log(data);
          // this.studentArray.push(data);
          this.infoBull.open(data.first_name + ' ' + data.last_name + ' has been created !', 'Close', {
            duration: 3000
          });
        }
      });
  }

  GetAllStudents() {
    this.studentSubscription = this.studentService.GetAllStudent()
      .subscribe(
        (data) => {
          for (var i= 0;i< data.length; i++) {
            this.studentArray.push(data[i]);
          }
          // console.log(data);
          this.STUDENT_DATA = new MatTableDataSource(this.studentArray);
          this.STUDENT_DATA.paginator = this.paginator;
        }, (error => console.log(error)));
    this.studentSubject.next(this.studentArray);
  }

  OpenUpdateMethod(dataStudent) {
    const dialog = this.dialog.open(CuStudentComponent, {
      width : '40%',
      height : '70%',
      disableClose : true,
      data: dataStudent,
    });
    dialog.afterClosed()
      .subscribe(data => {
        this.infoBull.open(data.first_name + ' ' + data.last_name + ' has been updated !', 'Close', {
          duration: 3000
        });
      });
  }

  /* Function that delete a teacher in Data base */
  DeleteMethod(idStudent) {
    console.log(idStudent);
    if (confirm('Are you sure to delete this student ?') === true) {
      this.studentService.DeleteStudent(idStudent)
        .subscribe(data => {
          if (data) {
            this.infoBull.open('Student has been deleted !', 'Close', {
              duration: 3000
            });
          }
        }, error => {
          this.infoBull.open('Server Error!', 'Close', {
            duration: 3000
          });
          console.log(error);
        });
    }
  }
}
