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

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thieu anh', detail: 'Vui long them anh cho reading list' });
      return
    } else if (!this.addedReadingListName) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thieu ten', detail: 'Vui long them ten cho reading list' });
      return
    } else if (!this.addedReadingListDesc) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thieu ten', detail: 'Vui long them mo ta cho reading list' });
      return
    }
    let image = await this.storageService.uploadImage(`readingList/${this.addedReadingListName}`, this.addedReadingListImage)
    if (!image) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Co loi xay ra, xin dung thu lai' });
      return
    }

    let addedRList: ReadingList = {
      description: this.addedReadingListDesc,
      image: image.path,
      name: this.addedReadingListName
    }
    this.postService.createRList(addedRList).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Hoan tat', detail: 'Tao topic thanh cong' });
    }, error => {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Co loi xay ra, xin dung thu lai' });
    })
  }
  changeRListStatus(rlist: ReadingList) {
    let targetStatus = rlist.status == "ACTIVE" ? "PENDING" : "ACTIVE"
    this.postService.changeStatus("readingList/", rlist.id as number, targetStatus).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: 'Doi status thanh cong' });
      rlist.status = targetStatus
    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Co loi xay ra' });
    })

  }
}
