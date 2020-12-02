import { Injectable } from '@angular/core';
import { TeacherModel } from '../../models/teacher/teacher.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient) { }

  CreateTeacher(teacher: TeacherModel) {
    console.log(teacher);
    return this.http.post('http://127.0.0.1:8000/user/teacher/', teacher);
  }

  GetAllTeacher(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/user/teacher/');
  }
}
