import {Component, OnInit, ViewChild} from '@angular/core';

declare var CKEDITOR: any;
@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {

  constructor() { }

  public ckeditorContent = 'Enter your note here';

  ngOnInit() {
    CKEDITOR.on('instanceCreated', (event) => {
      const editor = event.editor;
      editor.name = 'content';
    });
  }
  save(courseNote: string) {
  }
  getData() {
    console.log(CKEDITOR.instances.content.getData());
  }

}
