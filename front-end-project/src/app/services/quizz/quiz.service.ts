import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../../models/quiz_folder/quiz';
import {Answer} from '../../models/quiz_folder/answer';
import {AuthService} from '../auth-guard/auth.service';

@Injectable()
export class QuizService {
  private url = 'http://127.0.0.1:8000/quiz_management/quiz/';
  private url2 = 'http://127.0.0.1:8000/quiz_management/';

  /* catch selected answer */
  selectedAnswer = new EventEmitter<Answer>();

  /* manage user choices*/
  userAnswers: Answer[] = [];

  // Selected quiz
  selectedQuiz: number;

  constructor(private http: HttpClient, private  authService: AuthService) {}

  /* manage user choices*/
  saveUserAnswers(answers: Answer[]) {
    this.userAnswers = answers;
  }
  getUserAnswers() {
    return this.userAnswers;
  }


  getQuiz(): Observable<any[]> {
    // @ts-ignore
    return this.http.get<any[]>(this.url, {headers: this.authService.httpHeaders});
  }

  getSelectedQuiz(id: number): Observable<any> {
    // @ts-ignore
    console.log(this.authService.httpHeaders);
    return this.http.get<any>(this.url + id + '/', {headers: this.authService.httpHeaders});
  }

  postQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.url, quiz, {headers: this.authService.httpHeaders});
  }

  quizTaker(score: number, start_time: Date, end_time: Date, associated_student: number,
            associated_quiz: number): Observable<Quiz> {
    const body = {score, start_time, end_time, associated_student, associated_quiz};
    return this.http.post<Quiz>(this.url2 + 'quiz_taker/', body , {headers: this.authService.httpHeaders});
  }
}
