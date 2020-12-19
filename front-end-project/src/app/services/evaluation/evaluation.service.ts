import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EvaluationModel} from '../../models/evaluation/evaluation.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  url = 'http://127.0.0.1:8000/class_management/evaluation/';

  constructor(private http: HttpClient) { }

  CreateEvaluation(evaluation: EvaluationModel) {
    return this.http.post(this.url, evaluation);
  }

  DeleteEvaluation(id: number) {
    return this.http.delete(this.url + id + '/');
  }

  GetAllEvaluation(): Observable<EvaluationModel[]> {
    return this.http.get<EvaluationModel[]>(this.url);
  }

  GetSingleEvaluation(id: number) {
    return this.http.get(this.url + id + '/');
  }
}
