import { Component, Input } from '@angular/core';
import { ReadingList } from '../../model/ReadingList';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../service/storage.service';
import { PostService } from '../../service/post.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-all-rlists',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, ButtonModule, FileUploadModule, FormsModule, TagModule],
  templateUrl: './all-rlists.component.html',
  styleUrl: './all-rlists.component.css'
})
export class AllRListsComponent {
  constructor(private messageService: MessageService, private storageService: StorageService, private postService: PostService) {

  }
  @Input({ required: true })
  allRLists!: ReadingList[]
  addedReadingListName?: string
  addedReadingListImage?: any
  addedReadingListDesc?: string
  onUpload(event: any) {
    this.addedReadingListImage = event.currentFiles[0]
  }
  async onSubmit() {
    if (!this.addedReadingListImage) {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thiếu ảnh', detail: 'Vui lòng thêm ảnh cho reading list' });
      return
    } else if (!this.addedReadingListName) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thiếu tên', detail: 'Vui lòng thêm tên cho reading list' });
      return
    } else if (!this.addedReadingListDesc) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thiếu mô tả', detail: 'Vui lòng thêm mô tả cho reading list' });
      return
    }
    let image = await this.storageService.uploadImage(`readingList/${this.addedReadingListName}`, this.addedReadingListImage)
    if (!image) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra, xin đừng thử lại' });
      return
    }

    let addedRList: ReadingList = {
      description: this.addedReadingListDesc,
      image: image.path,
      name: this.addedReadingListName
    }
    this.postService.createRList(addedRList).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Hoàn tất', detail: 'Tạo topic thành công' });
    }, error => {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra, xin đừng thử lại' });
    })
  }
  changeRListStatus(rlist: ReadingList) {
    let targetStatus = rlist.status == "ACTIVE" ? "PENDING" : "ACTIVE"
    this.postService.changeStatus("readingList/", rlist.id as number, targetStatus).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: 'Đổi status thành công' });
      rlist.status = targetStatus
    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
    })

  }
}
