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
  serial: string[] = ['A4', 'C', 'D', 'TI'];
  options: string[] = ['All', 'Esp'];
  isSerie = true;
  isOption = true;
  serieTake: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ClassesForm();
  }

  ClassesForm() {
    this.ClassForm = this.formBuilder.group({
      class_number : ['', Validators.required],
      option : [''],
      level : ['', Validators.required],
      serie : ['']
    });
  }

  OnSubmitForm() {
    if (this.ClassForm.invalid) { return; }
    console.log('OK');

    const classes = new ClassesModel(
      this.ClassForm.get('class_number').value,
      this.ClassForm.get('option').value,
      this.ClassForm.get('level').value,
      this.ClassForm.get('serie').value,
      []
    );
  }

  TakeSerie(serie) {
    this.serieTake = serie;
    if (serie === 'C' || serie === 'D' || serie === 'TI') {
      this.isOption = false;
    } else {
      this.isOption = true;
    }
  }

  disableSerie(value) {
    console.log(value);
    console.log(this.serieTake);
    if (value === '6ème' || value === '5ème') {
      this.isSerie = false;
      this.isOption = false;
    } else if (value === '4ème' || value === '3ème') {
      this.isSerie = false;
      this.isOption = true;
    } else if ((value === '2nde' || value === '1ère' || value === 'Tle') && this.isOption === true) {
      this.isSerie = true;
    } else if ((value === '2nde' || value === '1ère' || value === 'Tle') && this.isSerie === true) {
      this.isOption = false;
    } else {
      this.isSerie = true;
      this.isOption = true;
    }
  }


}
