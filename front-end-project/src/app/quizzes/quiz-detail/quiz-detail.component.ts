import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz_folder/quiz';
import {QuizService} from '../../services/quizz/quiz.service';
import {Answer} from '../../models/quiz_folder/answer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz = null;
  currentIndex = 0;
  tempUserAnswer: Answer = null;
  userAnswerList: Answer[] = [];

  nextDisable = false;
  previousDisable = false;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.quizService.getSelectedQuiz(1)
      .subscribe(
        (data: any) => {this.quiz = data; console.log(this.quiz); },
        (error) => {console.log(error); }
      );
    this.quizService.selectedAnswer.subscribe(
      (answer: Answer) => {
        this.tempUserAnswer = answer;
        console.log(this.tempUserAnswer);
      }
    );
  }


  submitQuiz() {
    console.log('final result: ' + this.userAnswerList);
    console.log(this.userAnswerList);
    // save user answers
    this.quizService.saveUserAnswers(this.userAnswerList);
    this.router.navigate(['/quiz-result']);
  }

  saveAnswer() {
    if (this.quiz.questions.length >= this.userAnswerList.length) {
      if (this.tempUserAnswer != null) {
        this.userAnswerList.push(this.tempUserAnswer);
        this.tempUserAnswer = null;
        console.log(this.userAnswerList);
      } else {
        // need an emitter here
        this.nextDisable = true;
      }
    }
  }

  next() {
    this.saveAnswer();
    if (this.currentIndex === this.quiz.questions.length - 1) {
      this.submitQuiz();
      return;
    }
    if (this.currentIndex !== this.quiz.questions.length - 1) {
      this.currentIndex += 1;
    }
  }

  previous() {
    this.userAnswerList.length === 0 ? this.previousDisable = true : this.userAnswerList.pop();
    if (this.currentIndex !== 0) {
      this.currentIndex -= 1;
    }
  }

}
