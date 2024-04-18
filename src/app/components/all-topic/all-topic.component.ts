import { Component, Input } from '@angular/core';
import { Topic } from '../../model/Topic';
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
import { SplitButtonModule } from 'primeng/splitbutton';


@Component({
  selector: 'app-all-topic',
  standalone: true,
  imports: [CommonModule, TableModule, SplitButtonModule, InputTextModule, ButtonModule, FileUploadModule, FormsModule, TagModule],
  templateUrl: './all-topic.component.html',
  styleUrl: './all-topic.component.css'
})
export class AllTopicComponent {
  constructor(private messageService: MessageService, private storageService: StorageService, private postService: PostService) {

  }

  @Input({ required: true })
  allTopics!: Topic[]
  addedTopicName?: string
  addedTopicIcon?: any
  addedTopicDesc?: string
  onUpload(event: any) {
    this.addedTopicIcon = event.currentFiles[0]
  }
  async onChangeStatus(topic: Topic) {
    let targetStatus = topic.status == "ACTIVE" ? "PENDING" : "ACTIVE"
    this.postService.changeStatus("topic/", topic.id as number, targetStatus).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Success', detail: 'Đổi status thành công' });
      topic.status = targetStatus
    }, error => {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
    })

  }
  async onSubmit() {
    if (!this.addedTopicIcon) {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thiếu icon', detail: 'Vui lòng thêm icon cho topic' });
      return
    } else if (!this.addedTopicName) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thiếu tên', detail: 'Vui lòng thêm tên  cho topic' });
      return
    } else if (!this.addedTopicDesc) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thiếu mô tả', detail: 'Vui lòng thêm mô tả cho topic' });
      return
    }
    let icon = await this.storageService.uploadImage(`topic/${this.addedTopicName}`, this.addedTopicIcon)
    if (!icon) {
      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra, xin đừng thử lại' });
      return
    }

    let addedTopic: Topic = {
      description: this.addedTopicDesc,
      icon: icon.path,
      name: this.addedTopicName
    }
    this.postService.createTopic(addedTopic).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Hoan tat', detail: 'Tạo topic thành công' });
    }, error => {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra, xin đừng thử lại' });
    })

  }
}
