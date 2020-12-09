import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CourseModel} from '../../models/course/courses.model';
import {GetcourseModel} from '../../models/course/getcourses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'http://127.0.0.1:8000/class_management/course/';

  constructor(private http: HttpClient) { }

  GetAllCourses(): Observable<GetcourseModel[]> {
    return this.http.get<GetcourseModel[]>(this.url);
  }

  CreateCourse(coursesData: CourseModel) {
    console.log(coursesData);
    return this.http.post(this.url, coursesData);
  }

  DeleteCourse(id: number) {
    return this.http.delete(this.url + '/' + id + '/');
  }
}
