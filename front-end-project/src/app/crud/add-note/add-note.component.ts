import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  NoteForm: FormGroup;
  options: string[]= ['One', 'Two', 'Three', 'Four', 'Five', 'Eight'];
  filterOptions: Observable<string[]>;
  dateNow : Date

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.TakeValueForm();
    this.FilterValue();
  }

  TakeValueForm() {
    this.NoteForm = this.formBuilder.group({
      name : ['', Validators.required],
      date_Eval : ['', Validators.required],
      note : ['', [Validators.required, Validators.pattern('\+?\d+\.\d+')]]
    });
  }

  FilterValue(){
    this.filterOptions = this.NoteForm.get('name').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )
  }

  private _filter(value: string): string[]{
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
    option.toLowerCase().includes(filterValue));
  }

  OnsubmitNote() {

    if(this.NoteForm.invalid){return;}

    console.log(this.NoteForm.get('name').value + ' , ' + this.NoteForm.get('date_Eval').value + ' , ' + this.NoteForm.get('note').value);
  }

}
