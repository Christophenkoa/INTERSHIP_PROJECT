import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../services/auth-guard/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  username: string;
  isStaff: string;
  isSuperuser: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');

    if (this.isStaff === 'true' && this.isSuperuser === 'true') {
      // for administrator
      return ;
    } else if (this.isStaff === 'true' && this.isSuperuser === 'false') {
      // for teacher
      $(document).ready(function () {
        $('.course').hide();
        $('.teacher').hide();
        $('.student').hide();
      });
    } else if (this.isStaff === 'false' && this.isSuperuser === 'false') {
      // for student
      $(document).ready(function () {
        $('.course').hide();
        $('.teacher').hide();
        $('.student').hide();
        $('.classView').hide();
      });
    }

  }

  logout() {
    this.authService.logout();
  }
}
