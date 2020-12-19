import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ClassesModel} from '../../models/class/classes.model';
import {GetClassesModel} from "../../models/class/getclasses.models";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url = 'http://127.0.0.1:8000/class_management/class/';

  constructor(private http: HttpClient) { }

  GetAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  GetSingleClass(id: number): Observable<GetClassesModel>  {
    return this.http.get<GetClassesModel>(this.url + id + '/');
  }

  CreateClass(classe: ClassesModel) {
    return this.http.post(this.url, classe);
  }
}
