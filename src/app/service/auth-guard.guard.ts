import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router = inject(Router)
  const messageService = inject(MessageService)
  if (authService.isLoggedIn()) {
    return true;
  }
  messageService.add({ key: "k1", severity: 'error', summary: 'Truy cap tu choi', detail: 'Ban khong co quyen truy cap trang nay' });
  router.navigate(["/login"])
  return false;
};
