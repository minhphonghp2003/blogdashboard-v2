import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { UserService } from '../../service/user.service';
import { Reader } from '../../model/Reader';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-readers',
  standalone: true,
  imports: [PaginatorModule, TableModule],
  templateUrl: './readers.component.html',
  styleUrl: './readers.component.css'
})
export class ReadersComponent implements OnInit {
  constructor(private userService: UserService, private messageService: MessageService, private router: Router) {
  }
  allReaders!: Reader[]
  limit = 0
  totalElements = 0
  ngOnInit(): void {
    this.userService.getAllReader(0).subscribe(result => {
      this.totalElements = result.totalElements
      this.allReaders = result.content
      this.limit = result.size
    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Truy cập từ chối', detail: 'Bạn không có quyển truy cập trang này' });
      this.router.navigate(["/home"])
    })
  }
  search(event: any, dt: any) {
    dt.filterGlobal(event.target.value, 'contains')
  }
  paginate(event: any) {
    this.userService.getAllReader(event.page).subscribe(result => {
      this.allReaders = result.content
    })

  }
}
