import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseModel} from '../../models/course/courses.model';
import {ChapterModel} from '../../models/chapter/chapters.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
url = 'http://127.0.0.1:8000/class_management/chapter/';

  constructor(private http: HttpClient) { }

  GetAllNotes(): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(this.url);
  }
  GetSingleNote(id: number): Observable<ChapterModel> {
    return this.http.get<ChapterModel>(this.url + id + '/');
  }
  CreateNote(note: ChapterModel) {
    console.log(note);
    return this.http.post(this.url, note);
  }
}
