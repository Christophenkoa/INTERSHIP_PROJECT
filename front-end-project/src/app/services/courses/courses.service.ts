import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {CourseModel} from '../../models/course/courses.model';
import {GetcourseModel} from '../../models/course/getcourses.model';
import {AuthService} from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'http://127.0.0.1:8000/class_management/course/';

  courseSubject = new Subject<GetcourseModel[]>();
  courseArray: GetcourseModel[] = [];
  constructor(private http: HttpClient, private authService: AuthService) { }

  EmitCourse() {
    this.courseSubject.next(this.courseArray);
  }

  GetAllCourses(): Observable<GetcourseModel[]> {
    return this.http.get<GetcourseModel[]>(this.url, {headers: this.authService.httpHeaders});
  }

  GetAllCoursesArray() {
    return this.http.get<GetcourseModel[]>(this.url, {headers: this.authService.httpHeaders})
      .subscribe((data) => {
        this.courseArray = data;
        this.EmitCourse();
      }, error => console.log(error));
  }

  getSelectedCourse(id: number): Observable<any> {
    // @ts-ignore
    console.log(this.authService.httpHeaders);
    return this.http.get<any>(this.url + id + '/', {headers: this.authService.httpHeaders});
  }

  CreateCourse(coursesData: CourseModel): Observable<GetcourseModel> {
    console.log(coursesData);
    return this.http.post<GetcourseModel>(this.url, coursesData, {headers: this.authService.httpHeaders});
  }

  DeleteCourse(id: number) {
    return this.http.delete(this.url + id + '/', {headers: this.authService.httpHeaders});
  }

  UpdateCourse(id: number, coursesData: CourseModel): Observable<GetcourseModel> {
    return this.http.put<GetcourseModel>(this.url + id + '/', coursesData, {headers: this.authService.httpHeaders});
  }

}
