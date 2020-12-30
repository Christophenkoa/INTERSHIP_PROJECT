import { Injectable } from '@angular/core';
import { TeacherModel } from '../../models/teacher/teacher.model';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../auth-guard/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient,
              public infoBull: MatSnackBar,
              private authService: AuthService) { }

  CreateTeacher(teacher: TeacherModel) {
    // console.log(teacher);
    return this.http.post('http://127.0.0.1:8000/user/teacher/', teacher, {headers: this.authService.httpHeaders})
      .subscribe((data: TeacherModel) => {
          console.log(data);
        },
        error => {
          console.log(error);
          this.infoBull.open('Creation Error', 'Close', {
            duration: 2000
          });
        });
  }

  GetAllTeacher(): Observable<TeacherModel[]> {
    return this.http.get<TeacherModel[]>('http://127.0.0.1:8000/user/teacher/', {headers: this.authService.httpHeaders});
  }

  UpdateTeacher(teacherUpdated: TeacherModel, id: number) {
    return this.http.put('http://127.0.0.1:8000/user/teacher/' + id + '/', teacherUpdated, {headers: this.authService.httpHeaders});
  }

  DeleteTeacher(id: number) {
    return this.http.delete('http://127.0.0.1:8000/user/teacher/' + id + '/', {headers: this.authService.httpHeaders});
  }
}
