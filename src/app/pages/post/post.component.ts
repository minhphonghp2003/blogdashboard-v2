import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Tag } from '../../model/Tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReadingList } from '../../model/ReadingList';
import { Topic } from '../../model/Topic';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import EditorJS from "@editorjs/editorjs";
import { SplitButtonModule } from 'primeng/splitbutton';
import { BoxComponent } from '../../components/box/box.component';
import { StorageService } from '../../service/storage.service';
import { NewPost } from '../../model/NewPost';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
//@ts-ignore
import { Tools } from "./tools"
import { Draft } from '../../model/Draft';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [BoxComponent, InputSwitchModule, DialogModule, CommonModule, FormsModule, MultiSelectModule, DropdownModule, InputTextModule, SplitButtonModule, FileUploadModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  constructor(private postService: PostService, private storageService: StorageService, private messageService: MessageService, private route: Router, private activeRoute: ActivatedRoute) {
  }
  selectedTagIds?: number[]
  selectedReadingList?: ReadingList
  selectedTopic?: Topic
  isAutoSaved = false
  uploadedImage?: any
  title?: string
  foreword?: string
  postId?: number
  tags!: Tag[]
  readingLists!: ReadingList[]
  topics?: Topic[]
  editor: any
  buttonItems?: any
  isDisabled = false
  postPath?: string
  allDrafts: Draft[] = []
  draftPath?: string
  uploadInterval: any
  isUploadDraft = false
  isDraftDialog = false
  isConfirmDelete = false
  deletedDraft!: Draft
  uploadedFile?: any
  ngOnInit() {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 's') {
        // Stop app to open save window
        e.preventDefault();
        this.save()
      }
    });
    this.activeRoute.parent?.params.subscribe(result => {
      this.postId = (result as any).id
      if (!this.postId) {
        this.editor = new EditorJS({
          placeholder: 'Let`s write an awesome story!',
          holder: 'editor-js',
          tools: Tools
        });
        return
      }
      this.postService.getPostDetail(this.postId).subscribe(async result => {
        this.selectedTagIds = []
        result.tags.map(t => { this.selectedTagIds!.push(t.id as number) })
        this.selectedReadingList = result.readingList
        this.selectedTopic = result.topic
        this.title = result.title
        this.foreword = result.foreword
        this.postPath = result.postLink
        let blogContent = await this.storageService.downloadPost(result.postLink)

        this.editor = new EditorJS({
          placeholder: 'Let`s write an awesome story!',
          holder: 'editor-js',
          data: JSON.parse(blogContent),
          tools: Tools
        });
      })
    })

    this.buttonItems = [
      {
        label: 'Lưu vào máy', icon: 'pi pi-save', command: () => {
          this.save();
        }
      },
      {
        label: 'Tải lên từ máy', icon: 'pi pi-upload', command: () => {
          this.upload();
        }
      },
      {
        label: 'Tải từ cloud', icon: 'pi pi-cloud-download', command: () => {
          this.isDraftDialog = true
        }
      }
    ]

    this.postService.getAllTags().subscribe(result => {
      this.tags = [...result.filter(r => { return r.status === "ACTIVE" })]
    })
    this.postService.getAllReadingLists().subscribe(result => {
      this.readingLists = [...result.filter(r => { return r.status === "ACTIVE" })]
    })
    this.postService.getAllTopics().subscribe(result => {
      this.topics = [...result.filter(r => { return r.status === "ACTIVE" })]
    })
    this.postService.getAllDraft().subscribe(result => {
      this.allDrafts = result
    })
  }
  uploadImage(event: any) {
    this.uploadedImage = event.currentFiles[0]

  }
  onRemoveImage(event: any) {
    this.uploadedImage = undefined

  }
  async handleAutoSave(event: any) {
    if (!this.draftPath) {
      if (!this.title) {
        this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Vui lòng nhập tiêu đề bài viết' });
        event.checked = false
        return
      }
      this.draftPath = "draft/" + this.title + "_" + Date.now()
      let editorData = await this.editor.save()
      this.storageService.uploadPost(this.draftPath, JSON.stringify(editorData))
      this.isUploadDraft = true
      this.postService.createDraft(this.draftPath).subscribe()
    }
    if (event.checked) {
      this.isUploadDraft = true
      let editorData = await this.editor.save()
      this.storageService.uploadPost(this.draftPath as string, JSON.stringify(editorData))
      this.uploadInterval = setInterval(async () => {
        let editorData = await this.editor.save()
        this.storageService.uploadPost(this.draftPath as string, JSON.stringify(editorData))
      }, 1000 * 60)
    } else {
      this.isUploadDraft = false
      clearInterval(this.uploadInterval);

    }

  }
  async save() {
    let content = await this.editor.save()
    this.storageService.saveFile({ content: JSON.stringify(content), contentType: 'text/plain', fileName: "draft.txt" })

  }
  async post() {
    this.messageService.add({ key: "k1", severity: 'info', summary: 'Hold on', detail: 'Chờ tí nào' });
    if (!this.selectedTagIds || this.selectedTagIds.length == 0 || !this.selectedTopic || !this.title || !this.foreword) {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Error', detail: 'Vui lòng nhập hết thông tin' });

      return
    }
    this.isDisabled = true
    let editorData = await this.editor.save()
    let postPath = `${this.selectedTopic.name}/${this.title}_${Date.now()}`
    let data = await this.storageService.uploadPost(postPath, JSON.stringify(editorData))
    data = await this.storageService.uploadImage(postPath, this.uploadedImage)
    if (!data) {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Loi', detail: 'Có lỗi xảy ra' });
      this.isDisabled = false
      return
    }


    let newPost: NewPost = {
      foreword: this.foreword,
      imageLink: data.path,
      postLink: data.path,
      readingListId: this.selectedReadingList?.id,
      tagIds: this.selectedTagIds,
      title: this.title,
      topicId: this.selectedTopic.id!
    }
    this.postService.createPost(newPost).subscribe(result => {

      this.messageService.add({ key: "k1", severity: 'success', summary: 'Hoan tat', detail: 'Chúc mừng bạn đã hoàn tất đăng bài' });
      this.route.navigate(["/home"])
    }, err => {
      console.log(err);

      if (err.status == 403) {
        this.messageService.add({ key: "k1", severity: 'error', summary: '403 error', detail: 'Bạn không có quyền tạo post' });
      } else {
        this.messageService.add({ key: "k1", severity: 'error', summary: 'Loi', detail: 'Có lỗi xảy ra' });
      }
      this.isDisabled = false
    })


  }
  async update() {

    this.messageService.add({ key: "k1", severity: 'info', summary: 'Hold on', detail: 'Chờ tí nào' });
    this.isDisabled = true
    let content = await this.editor.save()
    let image = this.uploadedImage
    let updatedPost: NewPost = {
      foreword: this.foreword!,
      tagIds: this.selectedTagIds!,
      title: this.title!,
      topicId: this.selectedTopic?.id!,
      id: this.postId,
      readingListId: this.selectedReadingList?.id
    }

    if (image) {
      await this.storageService.uploadImage(this.postPath!, image)
    }
    await this.storageService.uploadPost(this.postPath!, JSON.stringify(content))

    this.postService.updatePost(updatedPost).subscribe(result => {
      this.messageService.add({ key: "k1", severity: 'success', summary: 'Hoan tat', detail: 'Chúc mừng bạn đã cập nhật thành công' });
      this.route.navigate(["/home"])
      this.isDisabled = false
    }, error => {
      this.isDisabled = false
    })
  }
  upload() {
    let element: HTMLElement = document.getElementById('uploadInput') as HTMLElement;
    element.click();
  }
  async uploaded(event: any) {
    let file = event.target.files[0]
    let content = JSON.parse(await file.text())
    this.editor.destroy()
    this.editor = new EditorJS({
      placeholder: 'Let`s write an awesome story!',
      holder: 'editor-js',
      data: content,
      tools: Tools
    });
  }
  async uploadFromCloud(draft: Draft) {
    let data = await this.storageService.downloadPost(draft.path)
    let content = JSON.parse(data)
    this.editor.destroy()
    this.editor = new EditorJS({
      placeholder: 'Let`s write an awesome story!',
      holder: 'editor-js',
      data: content,
      tools: Tools
    });
    this.draftPath = draft.path
  }
  deleteDraft() {
    this.postService.deleteDraft(this.deletedDraft.id).subscribe(result => {
      this.storageService.deleteDraft(this.deletedDraft.path)
      this.allDrafts.splice(this.allDrafts.indexOf(this.deletedDraft), 1);
    })
  }
}
