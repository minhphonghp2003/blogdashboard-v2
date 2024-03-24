import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface Cookie {
  name: string,
  value: string
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) {
  }
  addCookie(cookie: Cookie) {
    this.cookieService.set(cookie.name, cookie.value)
  }
  getCookie(name: string) {
    return this.cookieService.get(name)
  }
}
