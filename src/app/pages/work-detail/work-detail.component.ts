import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetail } from '../../model/PostDetail';
import { PostService } from '../../service/post.service';
import { StorageService } from '../../service/storage.service';
import { DockModule } from 'primeng/dock';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [CommonModule, DockModule, MenubarModule, DialogModule, TerminalModule, InputTextModule, ButtonModule, FormsModule],
  providers: [TerminalService],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.css'
})
export class WorkDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private postService: PostService, private storageService: StorageService, private messageService: MessageService,  private router: Router) {
  }
  dockItems!: MenuItem[];
  postId!: number
  postDetail!: PostDetail
  displayRemove = false
  displayGalleria = false;
  images!: any[];
  nodes!: any[];
  confirmDeleteText?: string
  ngOnInit(): void {

    this.dockItems = [

      {
        label: 'Stats',

        tooltipOptions: {
          tooltipLabel: "Statistic",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        routerLink: ["statistic"],
        icon: "assets/stat.png",

      },
      {
        label: 'Comment',
        routerLink: ["comment"],
        tooltipOptions: {
          tooltipLabel: "Comment",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/comment.webp",

      },
      {
        label: 'Setting',
        routerLink: ["edit"],
        icon: "assets/setting.png",
        tooltipOptions: {
          tooltipLabel: "Setting",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
      },
      {
        label: 'Photos',
        tooltipOptions: {
          tooltipLabel: "Photos",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/photo.svg",
        command: () => {
          this.displayGalleria = true
        }
      },
      {
        label: 'GitHub',
        icon: "assets/github.png",
        url: 'https://github.com/minhphonghp2003',
        tooltipOptions: {
          tooltipLabel: "Github",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
      },
      {
        label: 'Trash',
        icon: "assets/trash.png",
        tooltipOptions: {
          tooltipLabel: "Trash",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        command: () => {
          this.displayRemove = true
        }
      }
    ];


    this.postId = this.route.snapshot.params['id'];
    this.postService.getPostDetail(this.postId).subscribe(result => {
      result.imageLink = this.storageService.extractImage(result.imageLink)
      this.postDetail = result
    })


  }
  removePost() {
    let requiredText = this.postDetail.topic.name + "/" + this.postDetail.id
    if (requiredText !== this.confirmDeleteText) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Confirm text khong dung' });
      return
    }
    this.postService.deletePost(this.postDetail.id).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Xoa bai thanh cong' });
      this.router.navigate(["/home"])

    }, err => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Xoa bai thanh cong' });
      this.router.navigate(["/home"])
    })
  }


}
