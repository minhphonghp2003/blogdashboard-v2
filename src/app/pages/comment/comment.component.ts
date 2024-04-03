import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PostService } from '../../service/post.service';
import { Comment } from '../../model/Comment';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, CommonModule, FormsModule, InputTextModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  constructor(private messageService: MessageService, private postService: PostService, private activeRoute: ActivatedRoute, private userService: UserService) {
  }
  comments!: Comment[]
  selectedComment?: Comment[]
  comment?: Comment
  replyDialog = false
  postId!: number
  authorReply?: string
  replyTo?: Comment
  ngOnInit(): void {
    this.messageService.add({ key: "k1", severity: 'info', summary: 'Hold on', detail: 'Vui long cho mot lat' });
    this.activeRoute.parent?.params.subscribe(result => {
      this.postId = (result as any).id
      this.postService.getPostComment(this.postId).subscribe(result => {
        this.comments = [...result]
        this.comments.map(c => {
          console.log(c);
          if (c.replies) {
            this.comments.push(...c.replies)
          }

        })
      })
    })
  }
  replyClicked(cmt: Comment) {
    this.replyDialog = true
    this.replyTo = cmt
  }
  deleteComment(cmt: Comment) {
    this.postService.deleteComment(cmt.id!).subscribe(result => {
      this.comments = this.comments.filter(c => { return c.id != cmt.id })
    })

  }
  deleteMultipleComments() {

    for (const cmt of this.selectedComment!) {
      this.deleteComment(cmt)
    }

  }
  confirm() {
    let newComment!: Comment
    if (this.replyTo) {
      newComment = {
        fullName: "Author",
        postId: this.postId,
        text: this.authorReply!,
        userId: JSON.parse(this.userService.getUserIdFromToken()).jti,
        parentCommentId: this.replyTo!.parentCommentId || this.replyTo!.id
      }
    } else {
      newComment = {
        fullName: "Author",
        postId: this.postId,
        text: this.authorReply!,
        userId: JSON.parse(this.userService.getUserIdFromToken()).jti,
      }
    }
    this.postService.createComment(newComment).subscribe(result => {
      this.comments.push(newComment)
      this.replyDialog = false
    })

  }
  addComment() {
    this.replyDialog = true
  }
  hideDialog() {
    this.authorReply = ""
    this.replyTo = undefined
  }
}
