import {Component, OnInit} from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseModel} from '../models/course/courses.model';
import {CoursesService} from '../services/courses/courses.service';

declare var CKEDITOR: any;
@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  public ckeditorContent = 'Enter your note here';
  myNote = new ChapterModel('default title', '', 1);
  NoteForm: FormGroup;
  courses: CourseModel[] = [];

  constructor(private noteService: NoteService, private formBuilder: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
    this.getCoursesData();
    this.initCourseEditor();
    this.noteForm();
  }

  initCourseEditor() {
    CKEDITOR.on('instanceCreated', (event) => {
      const editor = event.editor;
      editor.name = 'content';
    });
  }

  getCoursesData() {
    this.courseService.GetAllCourses()
      .subscribe(
        (data: any) => {this.courses = data; console.log(data); },
        (error) => {console.log(error); }
      );
  }

  noteForm() {
    this.NoteForm = this.formBuilder.group({
        entitled : ['', Validators.required ],
        text : ['', Validators.required],
        course: ['', Validators.required]
      }
    );
  }

  OnSubmitForm() {
    this.getData();
  }

  getData() {
    console.log(CKEDITOR.instances.content.getData());
    this.myNote.text = CKEDITOR.instances.content.getData();
    console.log(this.myNote);
    this.noteService.CreateNote(this.myNote)
      .subscribe(
        (data: any) => {console.log(data); },
        (error) => {console.log(error); }
      );
  }

}
