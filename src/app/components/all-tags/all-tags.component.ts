import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { StorageService } from '../../service/storage.service';
import { PostService } from '../../service/post.service';
import { Tag } from '../../model/Tag';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-all-tags',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, InputTextModule, TagModule],
  templateUrl: './all-tags.component.html',
  styleUrl: './all-tags.component.css'
})
export class AllTagsComponent {
  constructor(private postService: PostService, private messageService: MessageService) {

  }
  @Input({ required: true })
  allTags!: Tag[]
  addedTagName?: string
  onSubmit() {
    if (!this.addedTagName) {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thiếu tên', detail: 'Vui lòng thêm tên  cho tag' });
      return
    }
    this.postService.createTag(this.addedTagName).subscribe(result => {

      this.messageService.add({ key: "k1", severity: 'success', summary: 'Hoàn tất', detail: 'Thêm tag thành công' });
      this.addedTagName = ""
    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra, xin đừng thử lại' })
    })
  }
  changeTagStatus(tag: Tag) {
    let targetStatus = tag.status == "ACTIVE" ? "PENDING" : "ACTIVE"
    this.postService.changeStatus("tag/", tag.id as number, targetStatus).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: 'Đổi status thành công' });
      tag.status = targetStatus
    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
    })
  }
}
