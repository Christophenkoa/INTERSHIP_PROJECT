import { Component, OnInit } from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {ActivatedRoute} from '@angular/router';

// text to speech library
import Speech from 'speak-tts';

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.scss']
})
export class DisplayCourseComponent implements OnInit {
  isPlay = false;
  myNote: ChapterModel = new ChapterModel('', '', 1);

  constructor(private noteService: NoteService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.GetSingleChapter();
<<<<<<< HEAD
    // this.readNote();
=======
>>>>>>> f853e435f4115daa5ac828798eccd065824dff7c
  }

  public toggle() {
    this.readNote();
    this.isPlay = !this.isPlay;
    // this.listenNote(this.isPlay);
  }

  listenNote(play: boolean) {
    if (true) {
      this.readNote();
    }
  }

  readNote() {
    console.log('readMethod');
    const message = 'The title of this chapter is : ' + this.myNote.entitled + '.  ' + ' That is the content: ' + this.myNote.text;
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance();
      // console.log(msg);
      const voices = window.speechSynthesis.getVoices();
      msg.voice = voices[3];
      console.log(voices);
      msg.volume = 1; // From 0 to 1
<<<<<<< HEAD
      msg.rate = 1; // From 0.1 to 10
      msg.pitch = 2; // From 0 to 2
      msg.lang = 'en-GB';
      // msg.text = this.myNote.text;
      msg.text = 'Hello World';
=======
      msg.rate = 0.8; // From 0.1 to 10
      msg.pitch = 1; // From 0 to 2
      msg.lang = 'en-GB';
      msg.text = message;
>>>>>>> f853e435f4115daa5ac828798eccd065824dff7c
      console.log(msg);
      window.speechSynthesis.speak(msg);
      console.log(voices);
      console.log(window.speechSynthesis.speaking);
    } else {
      // Speech Synthesis Not Supported 😣
      console.log('Sorry, your browser doesn\'t support text to speech!');
    }
  }

  GetSingleChapter() {
    const id = this.route.snapshot.params.id;
    this.noteService.GetSingleNote(id)
      .subscribe(
        (data) => {this.myNote = data; console.log(this.myNote); }
      );
  }

}
