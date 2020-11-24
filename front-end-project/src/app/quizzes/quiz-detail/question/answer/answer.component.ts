import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../../models/quiz_folder/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input()
  answer: Answer;

  @Input()
  selectedAnswer: number;

  letter: string;

  isSelected() {
    return true;
  }

  constructor() { }

  ngOnInit() {
    this.letter = String.fromCharCode(65 + this.answer.id);
  }

}
