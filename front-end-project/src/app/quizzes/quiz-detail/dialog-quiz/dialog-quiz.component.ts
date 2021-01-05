import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-quiz',
  templateUrl: './dialog-quiz.component.html',
  styleUrls: ['./dialog-quiz.component.scss']
})
export class DialogQuizComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogQuizComponent>) { }

  ngOnInit() {
  }

  ReturnFunct() {
    this.dialogRef.close();
  }

}
