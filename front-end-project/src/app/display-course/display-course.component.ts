import { Component, OnInit } from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.scss']
})
export class DisplayCourseComponent implements OnInit {
  isPlay = false;
  myNote = new ChapterModel('chapter title', 'chapter body', 1);

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.GetNote(2)
      .subscribe(
        (data: any) => {this.myNote = data;}
      );
  }

  public toggle() {
    this.isPlay = !this.isPlay;
    this.listenNote(this.isPlay);
  }

  listenNote(play: boolean) {
    if (!play) {
      return;
    }
  }

}
