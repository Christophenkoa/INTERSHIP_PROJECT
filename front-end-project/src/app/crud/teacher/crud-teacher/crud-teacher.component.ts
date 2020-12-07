import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CuTeacherComponent} from '../cu-teacher/cu-teacher.component';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-crud-teacher',
  templateUrl: './crud-teacher.component.html',
  styleUrls: ['./crud-teacher.component.scss']
})
export class CrudTeacherComponent implements OnInit {

  TEACHER_DATA: MatTableDataSource<any>;

  /** Differents columns of the table **/
  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'email', 'tel', 'gender', 'is_superuser', 'is_staff', 'is_active', 'actions'];

  /** Filter the information in DataTable **/
  applyFilter(filterValue: string) {
    this.TEACHER_DATA.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
              private teacherService: TeachersService,
              public infoBull: MatSnackBar) { }

  ngOnInit() {
    /* Call function for take all teachers */
    this.teacherService.GetAllTeacher()
      .subscribe(
        (data) => {
          this.TEACHER_DATA = new MatTableDataSource(data) ;
          this.TEACHER_DATA.paginator = this.paginator;
        }, (error => console.log(error))
      );
  }

  EditTeacher(teacherdata) {
    const dialogRef = this.dialog.open(CuTeacherComponent, {
      width : '60%',
      height : '70%',
      disableClose : true,
      data : teacherdata,
    });

    dialogRef.afterClosed()
      .subscribe(data => {
        this.infoBull.open(data.first_name + ' ' + data.last_name + ' has been updated !', 'Close', {
          duration: 3000
        });
      });
    // console.log(teacherdata);
  }
  /* Open the CU(Create and Update) interface */
  OpenCUMethod() {
    const dialog = this.dialog.open(CuTeacherComponent, {
      width : '60%',
      height : '70%',
      disableClose : true
    });
    dialog.afterClosed()
      .subscribe(data => {
        this.infoBull.open(data.first_name + ' ' + data.last_name + ' has been created !', 'Close', {
          duration: 3000
        });
      });
  }
  /* Function that delete a teacher in Data base */
  DeleteMethod(idTeacher) {
    if (confirm('Are you sure to delete this user ?') === true) {
      this.teacherService.DeleteTeacher(idTeacher)
        .subscribe(data => {
          if (data) {
            this.infoBull.open('Teacher has been deleted !', 'Close', {
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
