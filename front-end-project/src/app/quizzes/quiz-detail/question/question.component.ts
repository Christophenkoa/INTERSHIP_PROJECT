import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Question} from '../../../models/quiz_folder/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input()
  question: Question;

  constructor() { }

  ngOnInit() {
    console.log(this.question);
  }
  isSelected() {
    return true;
  }
}
