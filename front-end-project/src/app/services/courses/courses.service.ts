import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CourseModel} from '../../models/course/courses.model';
import {GetcourseModel} from '../../models/course/getcourses.model';
import {AuthService} from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'http://127.0.0.1:8000/class_management/course/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  GetAllCourses(): Observable<GetcourseModel[]> {
    return this.http.get<GetcourseModel[]>(this.url, {headers: this.authService.httpHeaders});
  }

  CreateCourse(coursesData: CourseModel) {
    console.log(coursesData);
    return this.http.post(this.url, coursesData, {headers: this.authService.httpHeaders});
  }

  DeleteCourse(id: number) {
    return this.http.delete(this.url + id + '/', {headers: this.authService.httpHeaders});
  }

  UpdateCourse(id: number, coursesData: CourseModel) {
    return this.http.put(this.url + id + '/', coursesData, {headers: this.authService.httpHeaders});
  }

}
