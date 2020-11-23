import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
data: any[];
  constructor() { }

  ngOnInit() {

    /*chart */
    this.data = [
      { Value: 30, Label: 'MATH', },
      { Value: 15, Label: 'FRENCH', },
      { Value: 30, Label: 'CHEMISTRY', },
      { Value: 25, Label: 'SPORT', },
    ];
  }
}
