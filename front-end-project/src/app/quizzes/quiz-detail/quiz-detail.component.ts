import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz_folder/quiz';
import {Question} from '../../models/quiz_folder/question';
import {Answer} from '../../models/quiz_folder/answer';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz;
  currentIndex = 0;
  selectedAnswer: number;
  answers = [];

  constructor() { }

  ngOnInit() {
    /*this.initializeAnswers();*/
  }
  initializeAnswers() {
    this.quiz = new Quiz('', 1, 15, 1, 1, []);
    console.log(this.answers);
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
