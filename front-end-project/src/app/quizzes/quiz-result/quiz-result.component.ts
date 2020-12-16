import { Component, OnInit } from '@angular/core';
import {Answer} from '../../models/quiz_folder/answer';
import {QuizService} from '../../services/quizz/quiz.service';
import {Quiz} from '../../models/quiz_folder/quiz';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  panelOpenState = false;
  mark = 0;
  result = 0.0;
  userAnswers: Answer[] = [];
  myQuiz: Quiz = new Quiz('', 1, 0, 1, 1, []);

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    console.log('quiz result');
    this.userAnswers = this.quizService.getUserAnswers();
    console.log(this.userAnswers);
    this.performScore();
    this.quizService.getSelectedQuiz(2).subscribe(
      (data: Quiz) => {this.myQuiz = data; }
    );
  }

  performScore() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.userAnswers.length; i++) {
      if (this.userAnswers[i].is_true) {
        this.mark = this.mark + 1;
      }
    }
    this.result = ((this.mark / this.userAnswers.length) * 100);
  }

  setColor(index: number, answer: Answer): string {
    if (this.userAnswers[index].id === answer.id) {
      if (this.userAnswers[index].is_true) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'white';
    }
  }

}
