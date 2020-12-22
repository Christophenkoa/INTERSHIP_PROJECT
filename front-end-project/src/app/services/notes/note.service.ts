import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseModel} from '../../models/course/courses.model';
import {ChapterModel} from '../../models/chapter/chapters.model';
import {Observable} from 'rxjs';
import {AuthService} from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
url = 'http://127.0.0.1:8000/class_management/chapter/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  GetNotes(): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(this.url, {headers: this.authService.httpHeaders});
  }
  GetNote(id: number): Observable<ChapterModel> {
    return this.http.get<ChapterModel>(this.url + id + '/', {headers: this.authService.httpHeaders});
  }
  CreateNote(note: ChapterModel) {
    console.log(note);
    return this.http.post(this.url, note, {headers: this.authService.httpHeaders});
  }
}
