import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CuClassComponent} from '../crud/cu-class/cu-class.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClassService} from '../services/classes/class.service';
import {GetClassesModel} from '../models/class/getclasses.models';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss']
})
export class ClassViewComponent implements OnInit {

  Allclasses: GetClassesModel[] = [];
  classChooseArray: GetClassesModel[] = [];
  id: string;
  isStaff: string;

  constructor(private dialog: MatDialog,
              public infoBull: MatSnackBar,
              public classesService: ClassService) { }
  ngOnInit() {
    this.GetAllClasses();
    console.log(typeof localStorage.getItem('is_staff'));
    this.id = localStorage.getItem('id');
    this.isStaff = localStorage.getItem('is_staff');
  }

  OpenCUMethod() {
    const dialog = this.dialog.open(CuClassComponent, {
      width: '30%',
      height: '60%',
      disableClose: true
    });
    dialog.afterClosed()
      .subscribe(data => {
        this.infoBull.open(data.level + ' ' + data.class_number + ' has been created !', 'Close', {
          duration: 3000
        });
      });
  }

  /* Get all classes and display them in this page */
  GetAllClasses() {
    this.classesService.GetAllClasses()
      .subscribe((data) => {
        this.Allclasses = data;
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].teachers.length; j++) {
            // console.log('Hello world !!!');
            if (this.id === data[i].teachers[j].id.toString() && this.isStaff === 'true') {
              this.classChooseArray.push(data[i]);
              console.log(this.classChooseArray);
            }
          }
        }
        console.log(this.classChooseArray);
        console.log(this.Allclasses);
      });
  }

}
