import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-login-log',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './login-log.component.html',
  styleUrl: './login-log.component.css'
})
export class LoginLogComponent implements OnInit {
  
  logs?: any
  ngOnInit(): void {
    this.logs = [
      {
        "device": "desktop",
        "location": "Hẻm 234/2 Nguyễn Văn Đậu, Binh Thanh District, Ho Chi Minh City, 72317, Vietnam",
        "browserName": "Chrome",
        "os": "Windows",
        "createdAt": "2024-03-30T14:07:39.635995Z"
      },
      {
        "device": "desktop",
        "location": "Hẻm 234/2 Nguyễn Văn Đậu, Binh Thanh District, Ho Chi Minh City, 72317, Vietnam",
        "browserName": "Chrome",
        "os": "Windows",
        "createdAt": "2024-03-30T14:07:39.635995Z"
      },
      {
        "device": "desktop",
        "location": "Hẻm 234/2 Nguyễn Văn Đậu, Binh Thanh District, Ho Chi Minh City, 72317, Vietnam",
        "browserName": "Chrome",
        "os": "Windows",
        "createdAt": "2024-03-30T14:07:39.635995Z"
      },


      {
        "device": "desktop",
        "location": "Hẻm 234/2 Nguyễn Văn Đậu, Binh Thanh District, Ho Chi Minh City, 72317, Vietnam",
        "browserName": "Chrome",
        "os": "Windows",
        "createdAt": "2024-03-30T14:07:39.635995Z"
      },
      {
        "device": "desktop",
        "location": "Hẻm 234/2 Nguyễn Văn Đậu, Binh Thanh District, Ho Chi Minh City, 72317, Vietnam",
        "browserName": "Chrome",
        "os": "Windows",
        "createdAt": "2024-03-30T14:07:39.635995Z"
      },
      {
        "device": "desktop",
        "location": "Hẻm 234/2 Nguyễn Văn Đậu, Binh Thanh District, Ho Chi Minh City, 72317, Vietnam",
        "browserName": "Chrome",
        "os": "Windows",
        "createdAt": "2024-03-30T14:07:39.635995Z"
      },

      {
        "device": "desktop",
        "location": "Hẻm 234/2 Nguyễn Văn Đậu, Binh Thanh District, Ho Chi Minh City, 72317, Vietnam",
        "browserName": "Chrome",
        "os": "Windows",
        "createdAt": "2024-03-30T14:07:39.635995Z"
      },
    ]
  }
}
