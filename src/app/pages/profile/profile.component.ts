import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserDetail } from '../../model/UserDetail';
import { CommonModule } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { PasswordUpdateComponent } from '../../components/password-update/password-update.component';
import { SocialsComponent } from '../../components/socials/socials.component';
import { StorageService } from '../../service/storage.service';
import { BoxComponent } from '../../components/box/box.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SplitButtonModule, UserDetailComponent, PasswordUpdateComponent, BoxComponent, SocialsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private storageService: StorageService) { }
  userDetail!: UserDetail
  ngOnInit(): void {
    this.userService.getUserDetail().subscribe(result => {
      result.userInformation.avatar = this.storageService.extractImage(result.userInformation.avatar || "")
      this.userDetail = result
    })

  }
}
