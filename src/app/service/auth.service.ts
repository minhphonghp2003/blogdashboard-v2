import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { LoginDetail } from '../model/Login';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginToken } from '../model/LoginToken';
import { Observable, lastValueFrom, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
  }
  isLoggedIn() {
    let auth = this.cookieService.get("Auth")
    return auth.length != 0

  }
  logout() {
    this.cookieService.delete("Auth")
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
  login(loginForm: LoginDetail) {
    let loginUrl = environment.apiUrl + "/user/login"
    return this.httpClient.post<LoginDetail>(loginUrl, loginForm)
  }
}
