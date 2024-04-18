import { Component } from '@angular/core';
import { BoxComponent } from '../../components/box/box.component';
import { AuthService } from '../../service/auth.service';
import { LoginDetail } from '../../model/Login';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginLog } from '../../model/LoginLog';
import { LogService } from '../../service/log.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BoxComponent, FormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: LoginDetail = {}
  loginLog: LoginLog = {}
  constructor(private loginLogService: LogService, private deviceDetector: DeviceDetectorService, private messageService: MessageService, private storageService: StorageService, private authService: AuthService, private router: Router) { }
  async handleLogin() {
    this.messageService.add({ key: "k1", severity: 'info', summary: 'Hold on', detail: 'Vui long cho mot lat' });
    this.authService.login(this.loginForm).subscribe(result => {
      let token = result.token
      if (token) {
        this.storageService.addCookie({ name: "Auth", value: token })
        this.loginLog = { ...this.deviceDetector.getDeviceInfo(), browserName: this.deviceDetector.getDeviceInfo().browser, device: this.deviceDetector.deviceType }
        this.loginLogService.getGeoLocationByIp().subscribe(result => {
          let lat = (result as any).lat
          let lon = (result as any).lon
          this.loginLogService.getGeoLocation(lat, lon).subscribe(result => {
            this.loginLog.location = (result as any).features[0].properties.formatted
            this.loginLogService.updateLoginLog(this.loginLog).subscribe(data => {
              this.router.navigate(["/home"]).then(() => {
                window.location.reload();
              })
            })
          })

        })
      }
    }, error => {
      if (error.status === 500 || error.status === 0) {

        this.messageService.add({ key: "k1", severity: 'error', summary: 'Login that bai', detail: 'Server die roi 😢😢' });
      } else {
        this.messageService.add({ key: "k1", severity: 'error', summary: 'Login that bai', detail: 'Kiem tra lai tai khoan' });
      }
    })

  }
}
