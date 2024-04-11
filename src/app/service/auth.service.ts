import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { LoginDetail } from '../model/Login';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../model/Token';
import { EmailForm } from '../model/EmailForm';
import { PasswordReset } from '../model/PasswordReset';
import { UserService } from './user.service';

const BASE_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
  }
  isLoggedIn() {
    let auth = this.cookieService.get("Auth")
    return auth.length != 0

  }
  checkAdmin() {
    let api = BASE_URL + "/user/checkAdmin"
    return this.httpClient.get(api)
  }
  logout() {
    this.cookieService.delete("Auth")
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
  login(loginForm: LoginDetail) {
    let loginUrl = BASE_URL + "/user/login"
    return this.httpClient.post<LoginDetail>(loginUrl, loginForm)
  }
  getRecvPassToken(email: string) {
    let url = BASE_URL + "/user/recvToken"
    return this.httpClient.post(url, email)
  }
  sendResetLinkEmail(emailForm: EmailForm) {
    let url = "https://eow8ijpnrwxsdra.m.pipedream.net"
    return this.httpClient.post(url, emailForm)
  }
  updatePassword(passwordReset: PasswordReset) {
    let url = BASE_URL + "/user/password"
    return this.httpClient.put<PasswordReset>(url, passwordReset)
  }
}
