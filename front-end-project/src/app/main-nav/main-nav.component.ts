import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../services/auth-guard/auth.service';
import * as $ from 'jquery';
import {NotificationService} from '../services/notifications/notification.service';
import {NotificationGetModel} from '../models/notification/notificationGet.model';
import {StudentsService} from '../services/student/students.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit, OnDestroy {
  username: string;
  isStaff: string;
  isSuperuser: string;
  id: string;

  studentClass = null;
  interval;

  notifications: NotificationGetModel[] = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private notificationService: NotificationService,
    private studentService: StudentsService
  ) {}


  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');

    console.log('hello');
    console.log(this.isStaff);
    console.log(this.isSuperuser);

    /*$(document).ready(function(){
      $('[data-toggle="popover"]').popover();
    });*/

    if (this.isStaff === 'false' && this.isSuperuser === 'false') {

      // retrieve user using its id
      this.studentService.GetSpecificStudent(+this.id).subscribe(
        (data) => {
          this.studentClass = data.my_class;
          console.log(this.studentClass);

          // request api every 10 seconds
          this.interval = setInterval(() => {
            // filter notifications by userClass
            this.notificationService.getNotifications().subscribe(
              (data2) => {
                this.notifications = data2.filter(notification => notification.classe_details.id === this.studentClass);
                console.log(data2);
                console.log(this.notifications);
              },
              (error) => {console.log(error); }
            );
          }, 10000);

          },
        (error) => { console.log(error); }
      );
    }

    if (this.isStaff === 'true' && this.isSuperuser === 'true') {
      // for administrator
      $(document).ready(() => {
        $('.home_student').hide();
        $('.home_teacher').hide();
        $('.quiz_create').hide();
      });
      // return ;
    } else if (this.isStaff === 'true' && this.isSuperuser === 'false') {
      // for teacher
      // tslint:disable-next-line:only-arrow-functions
      $(document).ready(function() {
        $('.course').hide();
        $('.teacher').hide();
        $('.student').hide();
        $('.home_student').hide();
        $('.admin_panel').hide();
      });
    } else if (this.isStaff === 'false' && this.isSuperuser === 'false') {
      // for student
      // tslint:disable-next-line:only-arrow-functions
      $(document).ready(function() {
        $('.course').hide();
        $('.teacher').hide();
        $('.student').hide();
        $('.classView').hide();
        $('.quiz_create').hide();
        $('.home_teacher').hide();
        $('.admin_panel').hide();
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
