import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { RecentPostComponent } from '../../components/recent-post/recent-post.component';
import { ChartModule } from 'primeng/chart';
import { ActivityComponent } from '../../components/activity/activity.component';
import { LoginLogComponent } from '../../components/login-log/login-log.component';
import { BoxComponent } from '../../components/box/box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WidgetComponent, RecentPostComponent, ChartModule,BoxComponent, ActivityComponent, LoginLogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lineStylesData: any;
  basicOptions: any;
  ngOnInit(): void {
    this.lineStylesData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: .4,
          borderColor: '#42A5F5'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: .4,
          borderColor: '#66BB6A'
        },
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FFA726',
          tension: .4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

}
