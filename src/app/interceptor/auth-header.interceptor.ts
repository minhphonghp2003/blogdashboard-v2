import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.storageService.getCookie("Auth")
    let authReq = request
    if (token && request.url.includes(environment.apiUrl)) {
      authReq = request.clone({ setHeaders: { Authorization: token } });
      
    }
    return next.handle(authReq);
  }
}
