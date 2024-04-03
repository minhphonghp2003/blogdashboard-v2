import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { RecentPostComponent } from '../../components/recent-post/recent-post.component';
import { ChartModule } from 'primeng/chart';
import { ActivityComponent } from '../../components/activity/activity.component';
import { LoginLogComponent } from '../../components/login-log/login-log.component';
import { BoxComponent } from '../../components/box/box.component';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { UserDetail } from '../../model/UserDetail';
import { StorageService } from '../../service/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WidgetComponent, RecentPostComponent, ChartModule, BoxComponent, ActivityComponent, LoginLogComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService, private userService: UserService, private strorageService: StorageService) {

  }
  lineStylesData: any;
  basicOptions: any;
  recentPosts!: any[]
  userDetail!: UserDetail
  totalPost: any = 0
  totalLike: any = 0
  totalView: any = 0
  totalShare: any = 0
  totalPoint: any = 0
  private transform(input: number, args?: any): string | number | null {
    let exp: number;
    const suffixes = ['K', 'M', 'B', 'T', 'Q', 'E'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (Math.abs(input) < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
  ngOnInit(): void {
    this.userService.getUserDetail().subscribe(user => {
      this.userDetail = user
      // console.log(user);
      this.postService.getAllPost({ limit: 9999999, page: 0, sortBy: "updated_at", authorId: user.userInformation.id }).subscribe(result => {
        result.content.map(p => { p.imageLink = this.strorageService.extractImage(p.imageLink) })
        this.recentPosts = [...result.content.slice(0, 6)]
        this.totalPost = result.totalElements
        result.content.map(p => {
          this.totalView += p.postStatistic.viewCount
          this.totalView += p.likeReader.length
          this.totalShare += p.postStatistic.shareCount
        })
        this.totalPoint += this.totalPost + this.totalView + this.totalLike * 2 + this.totalShare * 3 
        this.totalPoint = this.transform(this.totalPoint)
        this.totalLike = this.transform(this.totalLike)
        this.totalView = this.transform(this.totalView)
        this.totalPost = this.transform(this.totalPost)
        this.totalShare = this.transform(this.totalShare)

      })

    })
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
