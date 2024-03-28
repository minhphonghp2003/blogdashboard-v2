import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { UserDetail } from '../model/UserDetail';
import { StorageService } from './storage.service';

const BASE_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storageService: StorageService, private httpClient: HttpClient) { }
  getUserDetail() {
    let url = BASE_URL + "/user/userDetail"
    return this.httpClient.get<UserDetail>(url)
  }
  updateUserDetail(fullName: string, phone: string, bio: string) {
    let url = BASE_URL + "/user/userDetail"
    return this.httpClient.put(url, { fullName, phone, bio })
  }
  deleteUserSocial(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let options: any = {
      headers,
      body: id,
    };
    let url = BASE_URL + "/user/userSocial"
    return this.httpClient.delete(url, options)
  }
  addUserSocial(name: string, link: string, userId: string) {
    let url = BASE_URL + "/user/userSocial"
    return this.httpClient.post(url, { userId, link, name })
  }
  getUserIdFromToken() {
    let token = this.storageService.getCookie("Auth")
    return atob(token.split('.')[1])
  }
}
