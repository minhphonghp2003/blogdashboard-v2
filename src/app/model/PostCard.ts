import { IdName } from "./IdName";

export interface PostCard {
    id: number,
    imageLink: string,
    title: string,
    foreword: string,
    updatedAt: string,
    topic: IdName,
    likeReader: IdName[],
    tag: IdName[],
    readingList?: IdName

}