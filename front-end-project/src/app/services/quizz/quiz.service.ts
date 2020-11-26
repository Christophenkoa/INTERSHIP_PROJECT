import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../../models/quiz_folder/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private url = '';
  constructor(private http: HttpClientModule) {}

  getQuiz(): Observable<Quiz[]> {
    // @ts-ignore
    return this.http.get<Quiz[]>(this.url);
  }
}
