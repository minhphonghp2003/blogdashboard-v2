import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
const supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_URL)


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
  removeCookie(name: string) {
    this.cookieService.delete(name)
  }
  getCookie(name: string) {
    return this.cookieService.get(name)
  }
  extractImage(path: string): string {
    const { data } = supabase
      .storage
      .from('image')
      .getPublicUrl(path)
    return data.publicUrl
  }
}
