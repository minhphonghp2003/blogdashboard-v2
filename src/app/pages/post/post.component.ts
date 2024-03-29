import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Tag } from '../../model/Tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReadingList } from '../../model/ReadingList';
import { Topic } from '../../model/Topic';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import List from '@editorjs/list';
//@ts-ignore
import Marker from '@editorjs/marker';
//@ts-ignore
import InlineCode from '@editorjs/inline-code';
//@ts-ignore
import Underline from '@editorjs/underline';
//@ts-ignore
import ChangeCase from 'editorjs-change-case';
//@ts-ignore
import Strikethrough from '@sotaproject/strikethrough';
//@ts-ignore
import Delimiter from '@editorjs/delimiter';
//@ts-ignore
import Quote from '@editorjs/quote';
//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import Embed from '@editorjs/embed';
//@ts-ignore
import InlineImage from 'editorjs-inline-image';
//@ts-ignore
import editorjsCodeflask from '@calumk/editorjs-codeflask';
//@ts-ignore
import Superscript from 'editorjs2-superscript'
//@ts-ignore
import Subscript from 'editorjs-subscript'
import { SplitButtonModule } from 'primeng/splitbutton';
import { BoxComponent } from '../../components/box/box.component';
import { StorageService } from '../../service/storage.service';
import { NewPost } from '../../model/NewPost';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [BoxComponent, CommonModule, FormsModule, MultiSelectModule, DropdownModule, InputTextModule, SplitButtonModule, FileUploadModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  constructor(private postService: PostService, private storageService: StorageService, private messageService: MessageService, private route: Router) {
  }
  selectedTagIds!: number[]
  tags!: Tag[]
  selectedReadingList?: ReadingList
  readingLists!: ReadingList[]
  selectedTopic!: Topic
  topics!: Topic[]
  uploadedImage?: any
  editor: any
  buttonItems?: any
  title!: string
  foreword!: string
  isDisabled = false
  ngOnInit(): void {
    this.buttonItems = [
      {
        label: 'Save', icon: 'pi pi-save', command: () => {
          this.save();
        }
      }
    ]
    this.editor = new EditorJS({
      placeholder: 'Let`s write an awesome story!',
      holderId: 'editor-js',
      tools: {
        subscript: {
          class: Subscript
        },

        superscript: {
          class: Superscript
        },

        code: editorjsCodeflask,

        image: {
          class: InlineImage,
          inlineToolbar: true,
          config: {
            embed: {
              display: true,
            },
            unsplash: {
              appName: 'blog',
              apiUrl: 'https://api.unsplash.com/photos/?client_id=E8AD2LDvGauNI1CBsWBRxfDA3hLV-E6T4c3KB-n0O_M',
              maxResults: 30,
            }
          }
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
              facebook: true,
              instagram: true,
              twitter: true,
              imgur: true,
              codepen: true,
              pinterest: true
            }
          }
        },
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3],
            defaultLevel: 1
          }
        },
        delimiter: Delimiter,
        quote: Quote,

        strikethrough: Strikethrough,
        changeCase: {
          class: ChangeCase,
          config: {
            showLocaleOption: true, // enable locale case options
            locale: 'tr' // or ['tr', 'TR', 'tr-TR']
          }
        },
        underline: Underline,
        inlineCode: {
          class: InlineCode,
        },
        list: {
          class: List,
          inlineToolbar: ['link', 'bold']
        },
        marker: {
          class: Marker,
        }
      }
    });

    this.postService.getAllTags().subscribe(result => {
      this.tags = [...result.filter(r => { return r.status === "ACTIVE" })]
    })
    this.postService.getAllReadingLists().subscribe(result => {
      this.readingLists = [...result.filter(r => { return r.status === "ACTIVE" })]
    })
    this.postService.getAllTopics().subscribe(result => {
      this.topics = [...result.filter(r => { return r.status === "ACTIVE" })]
    })
  }
  uploadImage(event: any) {
    this.uploadedImage = event.currentFiles[0]

  }
  onRemoveImage(event: any) {
    this.uploadedImage = undefined

  }

  async save() {
    let content = await this.editor.save()
    this.storageService.saveFile({ content: JSON.stringify(content), contentType: 'text/plain', fileName: "draft.txt" })

  }
  async submit() {
    this.messageService.add({ key: "k1", severity: 'info', summary: 'Hold on', detail: 'Cho ti nao' });
    if (!this.selectedTagIds || this.selectedTagIds.length == 0 || !this.selectedTopic) {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Thieu topic/tags', detail: 'Topic va tags la bat buoc' });

      return
    }
    this.isDisabled = true
    let editorData = await this.editor.save()
    let postPath = `${this.selectedTopic.name}/${this.title}_${Date.now()}`
    let data = await this.storageService.uploadPost(postPath, JSON.stringify(editorData))
    data = await this.storageService.uploadImage(postPath, this.uploadedImage)
    if (!data) {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Loi', detail: 'Co loi xay ra' });
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

      this.messageService.add({ key: "k1", severity: 'success', summary: 'Hoan tat', detail: 'Chuc mung ban da hoan tat dang bai' });
      this.route.navigate(["/home"])
    }, err => {

      this.messageService.add({ key: "k1", severity: 'error', summary: 'Loi', detail: 'Co loi xay ra. Vui long thu lai sau' });
      this.isDisabled = false
    })


  }
}
