import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AllPostRequest } from '../../model/AllPostReq';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StorageService } from '../../service/storage.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { PostDetail } from '../../model/PostDetail';

let LIMIT = 9
@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, InfiniteScrollModule, BadgeModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent implements OnInit {
  constructor(private postService: PostService, private route: ActivatedRoute, private storageService: StorageService, private messageService: MessageService) {
  }

  page = 0
  userId!: string | null
  allPosts!: PostDetail[]
  isEnd = false

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("userId")
    let allPostReq: AllPostRequest = {
      limit: LIMIT,
      page: this.page,
      sortBy: "updated_at",
      authorId: this.userId || undefined,
    }
    this.postService.getAllPost(allPostReq).subscribe(result => {
      result.content.map(c => {
        c.imageLink = this.storageService.extractImage(c.imageLink)
      })
      this.allPosts = result.content
    }, err => {
      console.log(err);
    })
  }
  onScroll() {

    if (!this.isEnd) {
      this.messageService.add({ key: "k1", severity: 'info', summary: 'Loading...', life: 2000, detail: '' });
    } else {
      this.messageService.add({ key: "k1", severity: 'warn', summary: 'End of page', life: 2000, detail: 'Het roi dung luot nua' });

    }
    this.page++
    let allPostReq: AllPostRequest = {
      limit: LIMIT,
      page: this.page,
      sortBy: "updated_at",
      authorId: this.userId || undefined,
    }
    this.postService.getAllPost(allPostReq).subscribe(result => {
      result.content.map(c => {
        c.imageLink = this.storageService.extractImage(c.imageLink)
      })
      if (result.content.length != 0) {
        this.allPosts = [...this.allPosts, ...result.content]
      } else {
        this.isEnd = true
      }
    }, err => {
      console.log(err);
    })


  }
}
