import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';
import { MessageService } from 'primeng/api';

export const workDetailGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const messageService = inject(MessageService)
  const postService = inject(PostService)
  const userService = inject(UserService)
  const postId = route.params["id"];
  return postService.getPostDetail(postId).pipe(
    map(
      (result => {
        let authorId = (result as any).author.id
        let userId = JSON.parse(userService.getUserIdFromToken()).jti
        if (authorId === userId) {
          return true
        } else {
          messageService.add({ key: "k1", severity: 'error', summary: 'Truy cập từ chối', detail: ' Bạn không có quyển truy cập trang này' });
          router.navigate(["/home"])
          return false
        }
      })
    )
  )
};
