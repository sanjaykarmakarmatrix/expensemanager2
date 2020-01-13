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

  createGroup(formData) {
    return this.http.post(global.appUrl + 'group/create-group', formData);
  }

  groupList(page) {
    return this.http.get(`${global.appUrl}group/list?page=${page}`);
  }

  groupDetail(id) {
    return this.http.get(global.appUrl + 'group/details/' + id);
  }

  groupEdit(id) {
    return this.http.get(global.appUrl + 'group/edit/' + id);
  }

  groupUpdate(formData, groupId) {
    return this.http.post(global.appUrl + 'group/update/:groupId', formData);
  }

  userList(searchText) {
    return this.http.post(`${global.appUrl}user/search-list`, searchText);
    // return this.http.post(global.appUrl + 'user/search-list', searchText);
  }

}
