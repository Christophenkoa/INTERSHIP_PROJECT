import {Injectable, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AudioModel} from "../../models/other/audio.model";

@Injectable({
  providedIn: 'root'
})
export class OtherServiceService {
 url = 'http://127.0.0.1:8000/audio/';
  constructor(private http: HttpClient) { }

 ListenAudio(audio: AudioModel) {
    return this.http.post(this.url, audio);
 }
}
