import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClassesModel } from '../../models/class/classes.model';

@Component({
  selector: 'app-cu-class',
  templateUrl: './cu-class.component.html',
  styleUrls: ['./cu-class.component.scss']
})
export class CuClassComponent implements OnInit {

  ClassForm: FormGroup;
  Class: string[] = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];
  ClassNumber: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  serial: string[] = ['A', 'C', 'D', 'TI'];
  options: string[] = ['All', 'Esp'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ClassesForm();
  }

  ClassesForm() {
    this.ClassForm = this.formBuilder.group({
      class_number : ['', Validators.required],
      option : ['', Validators.required],
      level : ['', Validators.required],
      serie : ['', Validators.required]
    });
  }

  OnSubmitForm() {
    if (this.ClassForm.invalid) { return; }

    const classes = new ClassesModel( this.ClassForm.get('class_number').value,
                                      this.ClassForm.get('option').value,
                                      this.ClassForm.get('level').value,
                                      this.ClassForm.get('serie').value
                                    );
  }


}
