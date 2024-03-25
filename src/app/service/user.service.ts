import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { UserDetail } from '../model/UserDetail';

const BASE_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }
  getUserDetail() {
    let url = BASE_URL + "/user/userDetail"
    return this.httpClient.get<UserDetail>(url)

  }
}
