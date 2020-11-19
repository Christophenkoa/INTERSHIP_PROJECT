import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CuStudentComponent} from '../crud/student/cu-student/cu-student.component';
import {CuClassComponent} from '../crud/cu-class/cu-class.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-main-space',
  templateUrl: './main-space.component.html',
  styleUrls: ['./main-space.component.scss']
})
export class MainSpaceComponent implements OnInit {

  ClassForm : FormGroup;

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  OnSubmitForm() {

  }

  OpenCUMethod() {
    const dialog = new MatDialogConfig();
    dialog.width = '70%';
    dialog.height = '70%';
    dialog.disableClose = true;
    this.dialog.open(CuClassComponent, dialog);
  }

}
