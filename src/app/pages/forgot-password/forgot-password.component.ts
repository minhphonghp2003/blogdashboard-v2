import { Component, OnInit, inject } from '@angular/core';
import { BoxComponent } from '../../components/box/box.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailForm } from '../../model/EmailForm';
import { environment } from '../../../environments/environment';
import { Token } from '../../model/Token';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';
import { PasswordReset } from '../../model/PasswordReset';
import { CommonModule } from '@angular/common';




type InputField = {
  name: string,
  buttonText: string,
}
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [BoxComponent, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})

export class ForgotPasswordComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private messageService: MessageService) {

  }

  id: string = ""
  value: string = ""
  inputField: InputField = {
    name: "Email",
    buttonText: "Gui email dat lai mat khau",
  }
  handleSubmit() {
    this.messageService.add({ key: "k1", severity: 'info', summary: 'Hold on', detail: 'Vui lòng đợi một lát' });
    if (this.inputField.name === "Email") {
      this.authService.getRecvPassToken(this.value).subscribe(result => {
        this.messageService.add({ key: "k1", severity: 'success', summary: 'Email da duoc gui', detail: 'Vui lòng kiểm tra email để reset password', life: 7000 });
      }, error => {

        this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra vui lòng thử lại' });
      })
    } else if (this.inputField.name === "Password") {
      let password: PasswordReset = {
        password: this.value,
        token: this.id
      }
      this.authService.updatePassword(password).subscribe(res => { }, err => {
        if (err.status == 200) {

          this.messageService.add({ key: "k1", severity: 'success', summary: 'Thành công', detail: 'Cập nhật password thành công' });
          this.router.navigate(["/login"])
        }
      })

    }
  }


  ngOnInit(): void {

    this.id = this.route.snapshot.queryParamMap.get('id') || ""
    if (this.id) {
      this.inputField = {
        name: "Password",
        buttonText: "Xác nhận mật khẩu mới",
      }
    }
  }
}
