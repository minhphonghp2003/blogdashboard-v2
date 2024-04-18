import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { PostService } from '../../service/post.service';
import { PostDetail } from '../../model/PostDetail';
import { AllPostRequest } from '../../model/AllPostReq';
import { BoxComponent } from '../../components/box/box.component';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../model/Comment';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-post-manage',
  standalone: true,
  imports: [PaginatorModule, BoxComponent, CommonModule, BadgeModule, SkeletonModule, DialogModule, FormsModule],
  templateUrl: './post-manage.component.html',
  styleUrl: './post-manage.component.css'
})
export class PostManageComponent implements OnInit {
  constructor(private postService: PostService, private messageService: MessageService, private userService: UserService) {

  }
  allPosts: PostDetail[] = []
  totalElement = 0
  comment!: string
  selectedPost!: PostDetail
  isLoading = true
  dialogShow = false

  postReq: AllPostRequest = {
    page: 0,
    limit: 10,
    sortBy: "updated_at"
  }

  ngOnInit(): void {
    this.postService.getAllPost(this.postReq).subscribe(result => {
      this.allPosts = result.content
      this.totalElement = result.totalElements
      this.isLoading = false
    })
  }
  paginate(event: any) {
    this.isLoading = true
    this.postReq.page = event.page
    this.postService.getAllPost(this.postReq).subscribe(result => {
      this.allPosts = result.content
      this.isLoading = false
    })

  }
  onClick(post: PostDetail) {
    this.dialogShow = true
    this.selectedPost = post
  }
  changeStatus() {
    let post = this.selectedPost
    let newStatus = post.status == "PENDING" ? "ACTIVE" : "PENDING"
    this.postService.changeStatus("post/", post.id, newStatus).subscribe(result => {
      post.status = newStatus
      this.resetData()

    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
      this.resetData()
    })

  }
  onComment() {
    let comment: Comment = {
      fullName: "Mod",
      postId: this.selectedPost.id,
      text: this.comment,
      userId: this.userService.getUserIdFromToken(),

    }
    this.postService.createComment(comment).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: 'Comment thành công' });
      this.resetData()
    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
      this.resetData()
    })
  }
  resetData() {
    this.comment = ""
    this.dialogShow = false
  }
}
