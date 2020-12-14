import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentModel } from '../../models/student/student.model';
import {TeacherModel} from '../../models/teacher/teacher.model';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  CreateStudent(student: StudentModel) {
    return this.http.post('http://127.0.0.1:8000/user/student/', student);
  }

  GetAllStudent(): Observable<any[]> {
    return this.http.get<StudentModel[]>('http://127.0.0.1:8000/user/student/');
  }

  DeleteStudent(id: number) {
    return this.http.delete('http://127.0.0.1:8000/user/student/student/' + id + '/');
  }

  UpdateStudent(student: StudentModel, id: number) {
    return this.http.put('http://127.0.0.1:8000/user/student/student/' + id + '/', student);
  }
}
