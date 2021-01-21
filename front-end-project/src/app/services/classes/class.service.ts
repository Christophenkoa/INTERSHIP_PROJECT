import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ClassesModel} from '../../models/class/classes.model';
import {AuthService} from '../auth-guard/auth.service';
import {GetClassesModel} from '../../models/class/getclasses.models';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url = 'http://127.0.0.1:8000/class_management/class/';
  classArray: GetClassesModel[] = [];
  classeSubject = new Subject<GetClassesModel[]>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  EmitClass() {
    this.classeSubject.next(this.classArray);
  }

  GetAllClasses(): Observable<GetClassesModel[]> {
    return this.http.get<GetClassesModel[]>(this.url, {headers: this.authService.httpHeaders});
  }

  GetAllClassesArray() {
    return this.http.get<GetClassesModel[]>(this.url, {headers: this.authService.httpHeaders})
      .subscribe((data) => {
        this.classArray = data;
        // console.log(data);
        this.EmitClass();
      }, error => console.log(error));
  }

  GetSingleClass(id: number): Observable<GetClassesModel>  {
    return this.http.get<GetClassesModel>(this.url + id + '/', {headers: this.authService.httpHeaders});
  }

  CreateClass(classe: ClassesModel): Observable<GetClassesModel> {
    return this.http.post<GetClassesModel>(this.url, classe, {headers: this.authService.httpHeaders});
  }

  UpdateClass(classe: ClassesModel, id: number): Observable<GetClassesModel> {
    return this.http.put<GetClassesModel>(this.url + id + '/', classe, {headers: this.authService.httpHeaders});
  }

  DeleteClass(id: number) {
    return this.http.delete(this.url + id + '/', {headers: this.authService.httpHeaders});
  }
}
