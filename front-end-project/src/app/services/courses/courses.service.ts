import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'http://127.0.0.1:8000/class_management/course/';

  constructor(private http: HttpClient) { }
  GetAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
