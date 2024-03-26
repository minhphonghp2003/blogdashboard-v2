import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UserDetail } from '../../model/UserDetail';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, BadgeModule, InputTextModule, FormsModule, SplitButtonModule, ButtonModule, MatIconModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnChanges {
  constructor(private userService: UserService, private messageService: MessageService) {

  }
  @Input()
  userDetail!: UserDetail
  newUserDetail = {
    fullName: "",
    bio: "",
    phone: ""
  }
  isEditable = false
  isLoading = false
  ngOnChanges(changes: SimpleChanges): void {
    this.newUserDetail = { ...this.userDetail.userInformation }
  }
  toggleEdit() {
    if (this.isEditable) {
      this.isLoading = true
      this.userService.updateUserDetail(this.newUserDetail.fullName, this.newUserDetail.phone, this.newUserDetail.bio).subscribe(result => {
        this.isLoading = false
        this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: 'Thong tin profile cap nhat thanh cong' })
        this.isEditable = !this.isEditable
      }, error => {
        this.isLoading = false
      })

    } else {
      this.isEditable = !this.isEditable

    }
  }
  toggleCancle() {
    this.newUserDetail = { ...this.userDetail.userInformation }
    this.isEditable = !this.isEditable
  }

}
