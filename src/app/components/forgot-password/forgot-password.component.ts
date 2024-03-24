import { Component, OnInit } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { ActivatedRoute } from '@angular/router';
type InputField = {
  name: string,
  buttonText: string,
  action: Function
}
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})

export class ForgotPasswordComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  id: string | null = ""
  inputField: InputField = {
    name: "Email",
    buttonText: "Gui email dat lai mat khau",
    action: this.handleSendEmail
  }
  handleSendEmail() {
    console.log("gui email");
  }
  handleResetPsswd() {
    console.log("reset");

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id')
    if (this.id) {
      this.inputField = {
        name: "Mat khau moi",
        buttonText: "Xac nhan",
        action: this.handleResetPsswd
      }
    }


  }
}
