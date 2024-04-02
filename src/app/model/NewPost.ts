export interface NewPost {
    id?: number,
    title: string,
    foreword: string,
    imageLink?: string,
    postLink?: string,
    readingListId?: number | string,
    topicId: number | string,
    tagIds: number[]
}