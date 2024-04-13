import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { User } from './model/User';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthService } from './service/auth.service';
import { ToastModule } from 'primeng/toast';
import { UserDetail } from './model/UserDetail';
import { UserService } from './service/user.service';
import { StorageService } from './service/storage.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidenavComponent, ToastModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private storageService: StorageService) { }
  userDetail?: UserDetail
  isLoggedIn = this.authService.isLoggedIn()
  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.userService.getUserDetail().subscribe(userDetail => {
        userDetail.userInformation.avatar = this.storageService.extractImage(userDetail.userInformation.avatar || "")
        this.userDetail = userDetail
      }, error => {
        // console.log(error.error);
        this.authService.logout()
      })
    }
  }
  handleScrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" })

  }

}
