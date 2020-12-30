import { Component, OnInit } from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {CoursesService} from "../services/courses/courses.service";
import {GetcourseModel} from "../models/course/getcourses.model";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  chapters: ChapterModel[] = [];
  Course_list: GetcourseModel[] = [];

  constructor(private noteService: NoteService,
              private courseService: CoursesService) { }

  ngOnInit() {
    this.GetAllCourses();
  }
  GetAllCourses() {
    this.courseService.GetAllCourses()
      .subscribe((data) => {
        console.log(data);
        this.Course_list = data;
      });
  }

}
