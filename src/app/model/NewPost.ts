export interface NewPost {
    title: string,
    foreword: string,
    imageLink: string,
    postLink: string,
    readingListId?: number|string,
    topicId: number|string,
    tagIds: number[]
}