import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginLog } from '../model/LoginLog';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';
import { ActivityLog } from '../model/ActivityLog';

interface GeoLocation {
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private httpClient: HttpClient) { }

  getGeoLocation(latitude: number, longitude: number) {
    let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=5fb4a98f7dd5415eaa05ac28baebba7d`
    return this.httpClient.get(url);
  }
  updateLoginLog(loginLog: LoginLog) {
    let logUrl = environment.apiUrl + "/log/"
    return this.httpClient.post<LoginLog>(logUrl, loginLog)
  }
  getActivities(id: string) {
    let logUrl = environment.apiUrl + "/log/activity?userId=" + id
    return this.httpClient.get<ActivityLog[]>(logUrl)
  }
}
