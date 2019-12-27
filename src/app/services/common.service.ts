import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../globalConfig';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  login(formData) {
    return this.http.post(global.appUrl + 'login', formData);
  }
  
  registration(formData) {
    return this.http.post(global.appUrl + 'register', formData);
  }

}
