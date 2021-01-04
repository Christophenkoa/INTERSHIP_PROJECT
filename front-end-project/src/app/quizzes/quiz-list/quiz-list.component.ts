import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../services/quizz/quiz.service';
import {Quiz} from '../../models/quiz_folder/quiz';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public quiz: any = null;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.quizService.getQuiz()
      .subscribe(
        (data) => {
          this.quiz = data;
          console.log(this.quiz);
        },
        (error ) => {
          console.log(error);
        });
  }

  participate(quizId: number) {
    // tslint:disable-next-line:radix
    const studentId = parseInt(localStorage.getItem('id'));
    this.setQuizTaker(0, studentId, quizId);
  }

  setQuizTaker(score: number, studentId: number, quizId: number) {
    this.quizService.quizTaker(score, new Date(), new Date(), studentId, quizId).subscribe(
      (data) => {console.log(data);  this.router.navigate(['/quiz/participate', quizId]); },
      (error) => { console.log(error); }
    );
  }

}
