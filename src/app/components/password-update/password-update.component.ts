import { Component, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css'
})
export class PasswordUpdateComponent {
  constructor(private messageService: MessageService, private authService: AuthService) {

  }
  @Input()
  email!: string
  isUp = false
  isNum = false
  password: string = ""
  confirm: string = ""
  isLoading = false
  checkValidPassword() {
    this.isUp = this.password !== this.password.toLowerCase()
    this.isNum = /\d/.test(this.password)
    return this.password.length >= 8 && this.isUp && this.isNum && this.password === this.confirm
  }
  handleUpdate() {
    this.isLoading = true

    this.messageService.add({ key: "k1", severity: 'info', summary: 'Hold on', detail: 'Voi long doi chut  lat' })
    this.authService.updatePassword({ password: this.password }).subscribe(result => {

      this.messageService.add({ key: "k1", severity: 'success', summary: 'Completed', detail: 'Ban da cap nhat password thanh cong' })
      this.isLoading = false
      this.password = ""
      this.confirm = ""
    }, error => {
      if (error.status == 200) {

        this.messageService.add({ key: "k1", severity: 'success', summary: 'Completed', detail: 'Ban da cap nhat password thanh cong' })
        this.isLoading = false
        this.password = ""
        this.confirm = ""
      } else {
        this.messageService.add({ key: "k1", severity: 'error', summary: 'Loi', detail: 'Co loi xay ra' })
        this.isLoading = false
      }

    })


  }
}
