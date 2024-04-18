import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Role } from '../../model/Role';
import { RoleService } from '../../service/role.service';
import { IdName } from '../../model/IdName';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { BoxComponent } from '../../components/box/box.component';

@Component({
  selector: 'app-role-manage-component',
  standalone: true,
  imports: [BoxComponent, TableModule, ButtonModule, DialogModule, FormsModule, ListboxModule],
  templateUrl: './role-manage-component.component.html',
  styleUrl: './role-manage-component.component.css'
})
export class RoleManageComponent implements OnInit {

  constructor(private roleService: RoleService, private messageService: MessageService) {

  }
  toggleAddDialog = false
  allApis = []
  selectedActions!: string[]
  selectedRole!: Role
  selectedDeletedActions: IdName[] = []
  roles!: Role[]
  ngOnInit(): void {
    this.roleService.getAllApis().subscribe(apis => {
      this.roleService.getAllRoles().subscribe(roles => {
        this.roles = [...roles]
        this.allApis = Array.from(new Set([...apis].sort())) as []
      })

    })
  }
  detachAction(role: Role) {
    let selectedActions = this.selectedDeletedActions
    this.selectedDeletedActions = []
    selectedActions.forEach(action => {
      this.roleService.detachActionFromRole(role.id as number, action.id as number).subscribe(result => {
      }, err => {
        if (err.status == 200) {
          this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: `Xóa action ${action.name} thành công` });
          role.actions.splice(role.actions.indexOf(action), 1)
          // window.location.reload();
        }

      })
    });
  }
  assignActionToRole() {
    this.toggleAddDialog = false
    this.selectedActions.forEach(action => {
      this.roleService.assignAction(this.selectedRole.id as number, action).subscribe(
        result => {
          if (this.selectedRole.actions.some(a => { return a.name == (result as IdName).name })) {
            return
          }
          this.selectedRole.actions.push(result as IdName)
          this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: `Gán action ${action} thành công` });
        },
        error => {
          this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: `Có lỗi khi gán action ${action}` });
        }
      )
    });

  }
  onToggleClicked(role: Role) {
    this.toggleAddDialog = true
    this.selectedRole = role
  }
}
