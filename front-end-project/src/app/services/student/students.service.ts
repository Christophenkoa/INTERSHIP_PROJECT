import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentModel } from '../../models/student/student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  CreateStudent(student: StudentModel) {
    return this.http.post('http://127.0.0.1:8000/user/', student);
  }
}
