import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz_folder/quiz';
import {QuizService} from '../../services/quizz/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz = null;
  currentIndex = 0;
  selectedAnswer: number;
  answers = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getSelectedQuiz(30)
      .subscribe(
        (data: any) => {this.quiz = data; console.log(this.quiz); },
        (error) => {console.log(error); }
      );
  }

  saveAnswer() {
  }

  submitQuiz() {
  }

  next() {
    if (this.currentIndex === this.quiz.questions.length - 1) {
      this.submitQuiz();
      return;
    }

    if (this.selectedAnswer != null) {
      this.saveAnswer();
    }

    if (this.currentIndex !== this.quiz.questions.length - 1) {
      this.currentIndex += 1;
      this.selectedAnswer = null;
    }
  }

  selectAnswer(id: number) {
    console.log(id);
    this.selectedAnswer = id;
    this.answers[this.currentIndex] = id;
  }

  previous() {
    if (this.selectedAnswer != null) {
      this.saveAnswer();
    }

    if (this.currentIndex !== 0) {
      this.currentIndex -= 1;
      this.selectedAnswer = null;
    }
  }

}
