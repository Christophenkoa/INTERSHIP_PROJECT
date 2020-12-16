import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {CuClassComponent} from '../crud/cu-class/cu-class.component';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from "../services/classes/class.service";

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss']
})
export class ClassInfoComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private classService: ClassService) {
  }

  /** First table student **/
  studentColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  STUDENT_DATA: MatTableDataSource<any>;

  /** second table teacher **/
  teacherColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  TEACHER_DATA: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) studentpaginator: MatPaginator;

  @ViewChild(MatPaginator, {static: true}) teacherpaginator: MatPaginator;

  ngOnInit() {
    this.STUDENT_DATA.paginator = this.studentpaginator;
    this.PopulatePage();
  }

  applyFilter(filterValue: string) {
    this.STUDENT_DATA.filter = filterValue.trim().toLowerCase();
  }

  teacherFilter(filterVal: string) {
    this.TEACHER_DATA.filter = filterVal.trim().toLowerCase();
  }

  OpenCUMethod() {
    const dialog = new MatDialogConfig();
    dialog.width = '30%';
    dialog.height = '60%';
    dialog.disableClose = true;
    this.dialog.open(CuClassComponent, dialog);
  }

  /* Display all students, teachers and courses in the class selected. */
  PopulatePage() {
    /* For teacher */
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.classService.GetSingleClass(+id)
      .subscribe((TeacherData) => {
        this.TEACHER_DATA = new MatTableDataSource(TeacherData);
        this.TEACHER_DATA.paginator = this.teacherpaginator;
      }, error => console.log(error));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];


/**  Teacher data **/

export interface PeriodicVar {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const TEACHER_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
