import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url = 'http://127.0.0.1:8000/class_management/class/';

  constructor(private http: HttpClient) { }
  GetAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
