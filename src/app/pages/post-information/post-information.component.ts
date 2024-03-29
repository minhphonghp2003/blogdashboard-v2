import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Topic } from '../../model/Topic';
import { ReadingList } from '../../model/ReadingList';
import { Tag } from '../../model/Tag';
import { AllTopicComponent } from '../../components/all-topic/all-topic.component';
import { StorageService } from '../../service/storage.service';
import { AllRListsComponent } from '../../components/all-rlists/all-rlists.component';
import { AllTagsComponent } from '../../components/all-tags/all-tags.component';
import { BoxComponent } from '../../components/box/box.component';

@Component({
  selector: 'app-post-information',
  standalone: true,
  imports: [AllTopicComponent, AllRListsComponent, AllTagsComponent,BoxComponent],
  templateUrl: './post-information.component.html',
  styleUrl: './post-information.component.css'
})
export class PostInformationComponent implements OnInit {
  constructor(private postService: PostService, private storageService: StorageService) {
  }
  allTopics!: Topic[]
  allRLists!: ReadingList[]
  allTags!: Tag[]
  ngOnInit(): void {
    this.postService.getAllReadingLists().subscribe(rlists => {
      rlists.map(l => {
        l.image = this.storageService.extractImage(l.image)
      })
      this.allRLists = [...rlists]

    })
    this.postService.getAllTags().subscribe(tags => {
      this.allTags = [...tags]

    })
    this.postService.getAllTopics().subscribe(topics => {
      topics.map(t => {
        t.icon = this.storageService.extractImage(t.icon)

      })
      this.allTopics = [...topics]


    })
  }
}
