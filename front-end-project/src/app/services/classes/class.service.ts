import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ClassesModel} from '../../models/class/classes.model';
import {AuthService} from '../auth-guard/auth.service';
import {GetClassesModel} from '../../models/class/getclasses.models';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url = 'http://127.0.0.1:8000/class_management/class/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  GetAllClasses(): Observable<GetClassesModel[]> {
    return this.http.get<GetClassesModel[]>(this.url, {headers: this.authService.httpHeaders});
  }

  GetSingleClass(id: number): Observable<GetClassesModel>  {
    return this.http.get<GetClassesModel>(this.url + id + '/', {headers: this.authService.httpHeaders});
  }

  CreateClass(classe: ClassesModel) {
    return this.http.post(this.url, classe, {headers: this.authService.httpHeaders});
  }
}
