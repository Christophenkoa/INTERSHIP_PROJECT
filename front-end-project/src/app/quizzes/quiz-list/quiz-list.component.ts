import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../models/quiz_folder/quiz';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public quiz: Quiz[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getQuiz()
      .subscribe(data => this.quiz = data);
    console.log(this.quiz);
  }

}
