import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/User';
import { UserService } from '../../service/user.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../service/storage.service';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { Role } from '../../model/Role';
import { RoleService } from '../../service/role.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TimelineModule } from 'primeng/timeline';
import { LogService } from '../../service/log.service';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';
import { BoxComponent } from '../../components/box/box.component';
import { NewUser } from '../../model/NewUser';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [TableModule, TimelineModule, CommonModule, BadgeModule, DialogModule, MultiSelectModule, FormsModule, ButtonModule, InputTextModule, BoxComponent],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css'
})
export class UserManageComponent implements OnInit {
  constructor(private userService: UserService, private storageService: StorageService, private roleService: RoleService, private logService: LogService, private authService: AuthService, private messageService: MessageService) {
  }
  allUsers!: User[]
  isSelected = false
  selectedUser!: User
  allRoles!: Role[]
  newPassword!: string
  userEvents!: any[]
  newUser: NewUser = {}
  ngOnInit(): void {
    this.userService.getAllUser().subscribe(result => {
      result.map(r => {
        r.avatar = this.storageService.extractImage(r.avatar)
      })
      result.forEach(user => {
        user.roles.map(r => {
          if (r.name == "ADMIN") {
            r.color = "danger"
          } else if (r.name == "MODERATOR") {
            r.color = "warning"
          } else {
            r.color = "info"
          }
        })

      })
      this.allUsers = [...result]
    }, error => {
    })
    this.roleService.getAllRoles().subscribe(result => {

      this.allRoles = [...result]

    })
  }
  filter(target: any, dt: any) {
    dt.filterGlobal((target as HTMLTextAreaElement).value, 'contains')
  }
  selectRow() {
    this.logService.getActivities(this.selectedUser.id).subscribe(result => {
      this.userEvents = [...result].reverse()
      this.isSelected = true
    })
  }
  resetData() {
    this.userEvents = []
    this.isSelected = false
    this.newUser = {}
    this.newPassword = ""
  }
  onSetRole() {
    this.roleService.assignRoleToUser(this.selectedUser.roles.map(r => r.id as number), this.selectedUser.id).subscribe(result => {
      this.resetData()
    }, error => {
      this.resetData()
    })
  }
  // onSetPasswd() {
  //   if (this.newPassword) {
  //     this.authService.getRecvPassToken(this.selectedUser.credential.email).subscribe(recvToken => {
  //       this.authService.updatePassword({ password: this.newPassword, token: (recvToken as any).token }).subscribe(result => {
  //       }, error => {
  //         if (error.status == 200) {
  //           this.resetData()
  //           this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: 'Update password thanh cong' });
  //         }
  //       })

  //     })

  //   }
  // }
  onCreateUser() {
    this.newUser.roles = this.newUser.roles?.map(r => r.name) || []
    this.userService.createUser(this.newUser).subscribe(result => {

      this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: ` Tạo user ${this.newUser.fullName} thành công ` });
      this.resetData()
    })

  }
}
