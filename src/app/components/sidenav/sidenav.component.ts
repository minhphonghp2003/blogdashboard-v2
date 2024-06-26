import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Route } from '../../model/Route';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { UserDetail } from '../../model/UserDetail';



@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnChanges {
  constructor(private authService: AuthService) { }
  @ViewChild('route') private routeContainer?: ElementRef;
  isHover = false
  isEnd = true
  @Input()
  user?: UserDetail
  userAvatar = this.user?.userInformation.avatar || "nothning"
  routes: Route[] = [

  ]
  adminRoutes: Route[] = [

    { name: "Quản lí người dùng", icon: "manage_accounts", path: "userMng" },
    { name: "Quản lí phân quyền", icon: "admin_panel_settings", path: "roleMng" },
    { name: "Quản lí bài viết", icon: "edit_document", path: "postMng" },
    { name: "Thông tin độc giả", icon: "local_library", path: "readerMng" },
    // { name: "Thong ke", icon: "signal_cellular_alt", path: "statistic" },
  ]
  activeClass = ["!text-active", "after:w-[4px]", "after:bg-active", "after:rounded", "after:ml-3"]

  ngOnChanges(changes: SimpleChanges): void {

    let user = changes['user']
    if (user['currentValue']) {
      this.userAvatar = user['currentValue'].userInformation.avatar
    }
    this.routes = [
      { name: "Trang chủ", icon: "home", path: "home" },
      { name: "Viết bài", icon: "draw", path: "post" },
      { name: "Thông tin bài viết", icon: "description", path: "postInfo" },
      // { name: "Profile", icon: "account_circle", path: "profile" },
      { name: "Bài viết của tôi", icon: "work", path: ['work', { userId: this.user?.userInformation.id }] },
    ]
  }
  checkEndScroll(id: string) {
    return this.routeContainer?.nativeElement.offsetHeight + this.routeContainer?.nativeElement.scrollTop >= this.routeContainer?.nativeElement.scrollHeight - 3
  }
  handleScrollDown() {
    this.routeContainer?.nativeElement.scroll({
      top: this.routeContainer.nativeElement.scrollHeight,
      behavior: 'smooth'
    })
  }
  onScroll(event: any) {
  }
  mouseenter() {
    this.isHover = true

  }
  mouseleave() {
    this.isHover = false
  }
  handleLogout() {
    this.authService.logout()
  }
}
