import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../../models/quiz_folder/answer';
import {QuizService} from '../../../../services/quizz/quiz.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  select = false;
  @Input()
  answer: Answer;

  letter: string;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.letter = String.fromCharCode(65 + this.answer.id);
  }

  isSelected() {
    return this.select;
  }

  choose() {
    this.select = true;
    this.quizService.selectedAnswer.emit(this.answer);
  }

}
