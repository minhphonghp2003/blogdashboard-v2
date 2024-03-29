import { Injectable } from '@angular/core';
import { AllPostRequest } from '../model/AllPostReq';
import { PaginatedPosts } from '../model/PaginatedPosts';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpParams } from "@angular/common/http";
import { PostDetail } from '../model/PostDetail';
import { Topic } from '../model/Topic';
import { ReadingList } from '../model/ReadingList';
import { Tag } from '../model/Tag';
import { NewPost } from '../model/NewPost';
let BASE_URL = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,) { }

  getAllPost(allPostReq: AllPostRequest) {
    let url = BASE_URL + "/post/all"
    let params = new HttpParams({ fromObject: { ...allPostReq } })
    return this.httpClient.get<PaginatedPosts>(url, { params })
  }
  getPostDetail(id: number) {

    let url = BASE_URL + "/post/"
    let params = new HttpParams({ fromObject: { id } })
    return this.httpClient.get<PostDetail>(url, { params })
  }
  getAllTopics() {
    let url = BASE_URL + "/topic/all"
    return this.httpClient.get<Topic[]>(url)
  }
  getAllReadingLists() {

    let url = BASE_URL + "/readingList/all"
    return this.httpClient.get<ReadingList[]>(url)
  }
  getAllTags() {

    let url = BASE_URL + "/tag/all"
    return this.httpClient.get<Tag[]>(url)
  }
  createTopic(topic: Topic) {
    let url = BASE_URL + "/topic/"
    return this.httpClient.post(url, topic)
  }
  createRList(rlist: ReadingList) {
    let url = BASE_URL + "/readingList/"
    return this.httpClient.post(url, rlist)
  }
  createTag(name: string) {
    let url = BASE_URL + "/tag/"
    return this.httpClient.post(url, name)
  }
  createPost(newPost: NewPost) {
    let url = BASE_URL + "/post/"
    return this.httpClient.post<NewPost>(url, newPost)
  }
}
