import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationGetModel} from '../../models/notification/notificationGet.model';
import {NotificationPostModel} from '../../models/notification/notificationPost.model';
import {AuthService} from '../auth-guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = 'http://127.0.0.1:8000/class_management/notification/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getNotifications(): Observable<NotificationGetModel[]> {
    return this.http.get<NotificationGetModel[]>(this.url, {headers: this.authService.httpHeaders});
  }
  getNotification(id: number): Observable<NotificationGetModel> {
    return this.http.get<NotificationGetModel>(this.url + id + '/', {headers: this.authService.httpHeaders});
  }
  postNotification(notification: NotificationPostModel) {
    return this.http.post(this.url, notification, {headers: this.authService.httpHeaders});
  }
}
