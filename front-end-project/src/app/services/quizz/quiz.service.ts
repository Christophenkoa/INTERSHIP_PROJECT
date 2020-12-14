import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../../models/quiz_folder/quiz';
import {Answer} from '../../models/quiz_folder/answer';

@Injectable()
export class QuizService {
  private url = 'http://127.0.0.1:8000/quiz_management/quiz/';

  /* catch selected answer */
  selectedAnswer = new EventEmitter<Answer>();


  constructor(private http: HttpClient) {}

  getQuiz(): Observable<any[]> {
    // @ts-ignore
    return this.http.get<any[]>(this.url);
  }

  getSelectedQuiz(id: number): Observable<any[]> {
    // @ts-ignore
    return this.http.get<any[]>(this.url + id + '/');
  }

  postQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.url, quiz);
  }
}
