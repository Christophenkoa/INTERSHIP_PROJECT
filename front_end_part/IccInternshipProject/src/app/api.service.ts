import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000/user";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(this.baseurl + '/student/',
      {headers:this.httpHeaders});
  }
}
