import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Route } from '../../model/Route';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(private authService:AuthService){}
  isHover = false
  routes: Route[] = [
    { name: "Trang chu", icon: "home", path: "home" },
    { name: "Viet bai", icon: "draw", path: "post" },
    { name: "Thong tin bai viet", icon: "description", path: "postInfo" },
    { name: "Profile", icon: "account_circle", path: "profile" },
    { name: "Bai viet", icon: "work", path: "work" },
  ]
  activeClass = ["!text-active", "after:w-[4px]", "after:bg-active", "after:rounded", "after:ml-3"]
  mouseenter() {
    this.isHover = true
   
  }
  mouseleave() {
    this.isHover = false
  }
  handleLogout(){
    this.authService.logout()
  }
}
