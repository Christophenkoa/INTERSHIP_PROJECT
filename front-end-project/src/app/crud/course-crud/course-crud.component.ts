import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {PeriodicElement} from '../add-note/add-note.component';
import { CourseModel } from '../../models/course/courses.model';

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

@Component({
  selector: 'app-course-crud',
  templateUrl: './course-crud.component.html',
  styleUrls: ['./course-crud.component.scss']
})
export class CourseCrudComponent implements OnInit {

  CourseForm: FormGroup;
  filterCourse: Observable<string[]>;
  filterClass: Observable<string[]>;

  // tslint:disable-next-line:max-line-length
  courses: string[] = ['English', 'French', 'Chemistry', 'Physic', 'Mathematic', 'EPS', 'PCT', 'Deutsch', 'Spanish', 'History', 'Geographic'];
  class: string[] = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];

  // tslint:disable-next-line:jsdoc-format
  /** Table variables **/
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // tslint:disable-next-line:jsdoc-format
  /** End **/

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.TakeValue();
    this.FilterCourses();
    this.FilterClass();
    this.dataSource.paginator = this.paginator;
  }
  // tslint:disable-next-line:jsdoc-format
  /** Function that filter word and display the best choice **/
  FilterCourses() {
    this.filterCourse = this.CourseForm.get('course').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCourse(value))
      );
  }
  private _filterCourse(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.courses.filter(option =>
      option.toLowerCase().includes(filterValue));
  }
  // tslint:disable-next-line:jsdoc-format
  /** End **/

  // tslint:disable-next-line:jsdoc-format
  /** Function that filter word and display the best choice **/
  FilterClass() {
    this.filterClass = this.CourseForm.get('class').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterClass(value))
      );
  }

  private _filterClass(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.class.filter(option =>
      option.toLowerCase().includes(filterValue));
  }
  // tslint:disable-next-line:jsdoc-format
  /** End **/

  TakeValue() {
    this.CourseForm = this.formBuilder.group({
      course: ['', Validators.required],
      coef: ['', [Validators.required, Validators.max(9), Validators.min(0)]],
      class: ['', Validators.required]
    });
  }

  OnSubmitForm() {
    if (this.CourseForm.invalid) {return; }
    console.log(
      this.CourseForm.
      get('course').value + ' , ' + this.CourseForm.get('coef').value + ' , ' + this.CourseForm.get('class').value
    );
    const courses = new CourseModel(this.CourseForm.get('course').value,
                                    this.CourseForm.get('coef').value,
                                    // this.CourseForm.get('class').value
    );
  }

  // tslint:disable-next-line:jsdoc-format
  /** Table information and functions **/
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
