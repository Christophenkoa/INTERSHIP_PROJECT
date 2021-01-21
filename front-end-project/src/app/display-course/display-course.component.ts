import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {ActivatedRoute} from '@angular/router';

// text to speech library
import Speech from 'speak-tts';
import {OtherServiceService} from "../services/other/other-service.service";
import {AudioModel} from "../models/other/audio.model";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.scss']
})
export class DisplayCourseComponent implements OnInit {
  result = '';
  username: string;
  myNote: ChapterModel = new ChapterModel('', '', 1);
  url: string;
  constructor(private noteService: NoteService,
              private otherService: OtherServiceService,
              private infoBull: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.GetSingleChapter();
<<<<<<< HEAD
    this.username = localStorage.getItem('username');
    // this.MakeAudio();
=======
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
      msg.rate = 0.8; // From 0.1 to 10
      msg.pitch = 1; // From 0 to 2
      msg.lang = 'en-GB';
      msg.text = message;
      console.log(msg);
      window.speechSynthesis.speak(msg);
      console.log(voices);
      console.log(window.speechSynthesis.speaking);
    } else {
      // Speech Synthesis Not Supported 😣
      console.log('Sorry, your browser doesn\'t support text to speech!');
    }
>>>>>>> 75b909cf8c95ef5294be8ccaecf0f786b7391899
  }

  GetSingleChapter() {
    const id = this.route.snapshot.params.id;
    this.noteService.GetSingleNote(id)
      .subscribe(
        (data) => {this.myNote = data; console.log(this.myNote); }
      );
  }

  Play() {
    setTimeout(() => {
      const text = document.getElementById('TakeText').textContent;
      // console.log(text);
      const AudioParams = new AudioModel(this.myNote.entitled, this.username, text);
      this.otherService.ListenAudio(AudioParams)
        .subscribe(data => {
          console.log(data);
          this.url = data.toString();
          console.log(this.url);
          const audioR = new Audio(this.url);
          audioR.play();
          /*const audio = document.getElementById('audio');
          audio.play();*/
        }, error => {
          this.infoBull.open('ERROR : a media can\'t be listen in your device !', 'Close', {
            duration: 3000
          });
        });
    }, 1000);
  }

  Pause() {
    const audio = new Audio(this.url);
    audio.pause();
  }

  /*MakeAudio() {
    setTimeout(() => {
      const text = document.getElementById('TakeText').textContent;
      // console.log(text);
      const AudioParams = new AudioModel(this.myNote.entitled, this.username, text);
      this.otherService.ListenAudio(AudioParams)
        .subscribe(data => {
          console.log(data);
          this.isActive = true;
        }, error => {
          this.infoBull.open('ERROR : a media can\'t be listen !', 'Close', {
            duration: 3000
          });
          console.log();
        });
    }, 1000);
  }*/

}
