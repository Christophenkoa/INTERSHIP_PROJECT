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
      { Value: 30, Label: 'Google',    },
      { Value: 15, Label: 'Microsoft', },
      { Value: 30, Label: 'Apple',     },
      { Value: 25, Label: 'Samsung',   },
    ];
  }
}
