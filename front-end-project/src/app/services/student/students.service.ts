import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentModel } from '../../models/student/student.model';
import {TeacherModel} from '../../models/teacher/teacher.model';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../auth-guard/auth.service';
import {GetstudentModel} from '../../models/student/getstudent.model';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  studentArray: GetstudentModel[] = [];
  studentSubject = new Subject<GetstudentModel[]>();
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  EmitStudent() {
    this.studentSubject.next(this.studentArray);
  }

  CreateStudent(student: StudentModel): Observable<GetstudentModel> {
    return this.http.post<GetstudentModel>('http://127.0.0.1:8000/user/student/', student, {headers: this.authService.httpHeaders});
  }

  GetAllStudent(): Observable<GetstudentModel[]> {
    return this.http.get<GetstudentModel[]>('http://127.0.0.1:8000/user/student/', {headers: this.authService.httpHeaders});
  }

  GetAllStudentArray() {
    return this.http.get<GetstudentModel[]>('http://127.0.0.1:8000/user/student/', {headers: this.authService.httpHeaders})
      .subscribe((data) => {
        this.studentArray = data;
        this.EmitStudent();
      }, error => console.log(error));
  }

  GetSpecificStudent(id: number): Observable<GetstudentModel> {
    return this.http.get<GetstudentModel>('http://127.0.0.1:8000/user/student/' + id + '/', {headers: this.authService.httpHeaders});
  }

  DeleteStudent(id: number) {
    return this.http.delete('http://127.0.0.1:8000/user/student/' + id + '/', {headers: this.authService.httpHeaders});
  }

  UpdateStudent(student: StudentModel, id: number): Observable<StudentModel> {
    return this.http.put<StudentModel>('http://127.0.0.1:8000/user/student/' + id + '/', student, {headers: this.authService.httpHeaders});
  }
}
