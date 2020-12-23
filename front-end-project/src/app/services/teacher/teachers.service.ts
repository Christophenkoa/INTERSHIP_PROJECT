import { Injectable } from '@angular/core';
import { TeacherModel } from '../../models/teacher/teacher.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  CreateTeacher(teacher: TeacherModel) {
    console.log(teacher);
    return this.http.post('http://127.0.0.1:8000/user/teacher/', teacher, {headers: this.authService.httpHeaders});
  }

  GetAllTeacher(): Observable<any[]> {
    return this.http.get<TeacherModel[]>('http://127.0.0.1:8000/user/teacher/', {headers: this.authService.httpHeaders});
  }

  UpdateTeacher(teacherUpdated: TeacherModel, id: number) {
    return this.http.put('http://127.0.0.1:8000/user/teacher/' + id + '/', teacherUpdated, {headers: this.authService.httpHeaders});
  }

  DeleteTeacher(id: number) {
    return this.http.delete('http://127.0.0.1:8000/user/teacher/' + id + '/', {headers: this.authService.httpHeaders});
  }
}
