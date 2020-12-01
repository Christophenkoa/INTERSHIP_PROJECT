import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CuTeacherComponent} from '../cu-teacher/cu-teacher.component';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {TeacherModel} from '../../../models/teacher/teacher.model';

export interface TeacherElement {
  username: string;
  name: string;
  surname: string;
  email: string;
  gender: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
}


@Component({
  selector: 'app-crud-teacher',
  templateUrl: './crud-teacher.component.html',
  styleUrls: ['./crud-teacher.component.scss']
})
export class CrudTeacherComponent implements OnInit {

  TEACHER_DATA: MatTableDataSource<any>;

  /** Differents columns of the table **/
  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'email', 'gender', 'is_superuser', 'is_staff', 'is_active', 'actions'];

  /** Filter the information in DataTable **/
  applyFilter(filterValue: string) {
    this.TEACHER_DATA.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
              private teacherService: TeachersService) { }

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

  /** Open the CU(Create and Update) interface **/
  OpenCUMethod() {
    const dialog = new MatDialogConfig();
    dialog.width = '60%';
    dialog.height = '70%';
    dialog.disableClose = true;
    this.dialog.open(CuTeacherComponent, dialog);
  }
}
