import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router = inject(Router)
  const messageService = inject(MessageService)
  return authService.checkAdmin().pipe(map(result => {
    if (result == false) {
      messageService.add({ key: "k1", severity: 'error', summary: 'Truy cập từ chối', detail: ' Bạn không có quyển truy cập trang này' });
    }
    return result as boolean
  }))

};
