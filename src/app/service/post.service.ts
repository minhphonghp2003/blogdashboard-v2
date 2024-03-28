import { Injectable } from '@angular/core';
import { AllPostRequest } from '../model/AllPostReq';
import { PaginatedPosts } from '../model/PaginatedPosts';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpParams } from "@angular/common/http";
import { PostDetail } from '../model/PostDetail';
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
}
