import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';
import { ActivityLog } from '../../model/ActivityLog';
import { LogService } from '../../service/log.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [TimelineModule, CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  constructor(private logService: LogService, private userService: UserService) {
  }
  events1?: any[];

  ngOnInit(): void {
    this.logService.getActivities(JSON.parse(this.userService.getUserIdFromToken()).jti).subscribe(result => {
      this.events1 = result.reverse()
    })
  }

}
