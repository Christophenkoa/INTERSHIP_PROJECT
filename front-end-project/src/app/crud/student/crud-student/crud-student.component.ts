import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTableDataSource, MatDialogRef} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {CuStudentComponent} from '../cu-student/cu-student.component';
import { MatDialogConfig } from '@angular/material';
import { StudentModel } from '../../../models/student/student.model';

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
];

@Component({
  selector: 'app-crud-student',
  templateUrl: './crud-student.component.html',
  styleUrls: ['./crud-student.component.scss']
})
export class CrudStudentComponent implements OnInit {

  constructor(private dialog: MatDialog){ }

  /** Differents columns of the table **/
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  /** Filter the information in DataTable **/
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Open the CU(Create and Update) interface **/
  OpenCreateMethod() {
    const dialog = new MatDialogConfig();
    dialog.width = '50%';
    dialog.height = '75%';
    dialog.disableClose = true;
    this.dialog.open(CuStudentComponent, dialog);
  }

  OpenUpdateMethod() {
    const dialog = new MatDialogConfig();
    dialog.width = '50%';
    dialog.height = '75%';
    dialog.disableClose = true;
    this.dialog.open(CuStudentComponent, dialog);
  }
}
