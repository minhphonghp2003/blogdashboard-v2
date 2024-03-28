export interface AllPostRequest {
    page:  number,
    limit:  number,
    readingListId?:  number,
    topicId?:  number,
    authorId?: string,
    sortBy: "updated_at" | "view_count" | "like_count" | "share_count"
}