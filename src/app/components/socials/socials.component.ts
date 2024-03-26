import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserSocial } from '../../model/UserSocial';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent implements OnChanges {
  constructor(private userService: UserService) {

  }
  @Input()
  socials!: UserSocial[]
  socialLinks: UserSocial[] = [
    {
      name: "Website",
      icon: "pi-globe text-blue-500"
    },
    {
      name: "Twitter",
      icon: "pi-twitter text-blue-500"
    },
    {
      name: "Youtube",
      icon: "pi-youtube text-red-500"
    },
    {
      name: "Github",
      icon: "pi-github"
    },
    {
      name: "Zalo",
      icon: "pi-send"
    },
    {
      name: "Facebook",
      icon: "pi-facebook text-blue-500"
    },
    {
      name: "Instagram",
      icon: "pi-instagram bg-gradient-to-r from-orange-600 via-blue-500 to-purple-400 inline-block text-transparent bg-clip-text"
    },
    {
      name: "BuyMeACoffee",
    },

  ]
  isInput = false
  linkValue!: string
  linkId!: number
  linkName!: string
  @Input()
  userId!: string
  ngOnChanges(changes: SimpleChanges): void {
    for (let s of changes["socials"].currentValue) {
      this.socialLinks.map(sL => {
        if (sL.name === s.name) {
          sL.link = s.link
          sL.id = s.id
        }
      })
    }



  }
  handleClick(id: any, name: any) {
    if (id) {
      this.userService.deleteUserSocial(id).subscribe(result => {
        window.location.reload()
      }, error => {

      })
    } else {
      this.isInput = true
      this.linkName = name
    }
  }
  updateSocial() {
    this.userService.addUserSocial(this.linkName, this.linkValue, this.userId).subscribe(result => {
      window.location.reload()
    }, err => {

    })


  }
}
