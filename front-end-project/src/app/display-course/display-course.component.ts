import { Component, OnInit } from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.scss']
})
export class DisplayCourseComponent implements OnInit {
  isPlay = false;
  myNote: ChapterModel;

  constructor(private noteService: NoteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.GetSingleChapter();
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

  GetSingleChapter() {
    const id = this.route.snapshot.params['id'];
    this.noteService.GetSingleNote(id)
      .subscribe(
        (data) => {this.myNote = data;}
      );
  }

}
