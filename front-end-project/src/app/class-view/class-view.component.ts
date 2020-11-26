import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CuClassComponent} from '../crud/cu-class/cu-class.component';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss']
})
export class ClassViewComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  OpenCUMethod() {
    const dialog = new MatDialogConfig();
    dialog.width = '40%';
    dialog.height = '40%';
    dialog.disableClose = true;
    this.dialog.open(CuClassComponent, dialog);
  }

}
