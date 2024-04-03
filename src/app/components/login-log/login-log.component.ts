import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../service/user.service';
import { LogService } from '../../service/log.service';

@Component({
  selector: 'app-login-log',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './login-log.component.html',
  styleUrl: './login-log.component.css'
})
export class LoginLogComponent implements OnInit {
  constructor(private logService: LogService) {

  }
  logs?: any
  ngOnInit(): void {
    this.logService.getLoginLog().subscribe(result => {
      this.logs = [...result]
    })

  }
}
