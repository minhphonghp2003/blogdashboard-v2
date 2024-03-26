import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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
    { name: "Trang chu", icon: "home", path: "home" },
    { name: "Viet bai", icon: "draw", path: "post" },
    { name: "Thong tin bai viet", icon: "description", path: "postInfo" },
    // { name: "Profile", icon: "account_circle", path: "profile" },
    { name: "Bai viet", icon: "work", path: "work" },
  ]
  adminRoutes: Route[] = [

    { name: "Quan li nguoi dung", icon: "manage_accounts", path: "userMng" },
    { name: "Quan li bai viet", icon: "edit_document", path: "postMng" },
    { name: "Quan li doc gia", icon: "local_library", path: "readerMng" },
    { name: "Thong ke", icon: "signal_cellular_alt", path: "statistic" },
  ]
  activeClass = ["!text-active", "after:w-[4px]", "after:bg-active", "after:rounded", "after:ml-3"]
  ngOnChanges(changes: SimpleChanges): void {
    let user = changes['user']
    this.userAvatar = user['currentValue'].userInformation.avatar
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
