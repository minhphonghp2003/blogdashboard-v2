import { IdName } from "./IdName";
import { Topic } from "./Topic";
import { ReadingList } from "./ReadingList";
import { Tag } from "./Tag";

interface Statistic {
    shareCount: number,
    viewCount: number
}


export interface PostDetail  {
    id: number,
    imageLink: string,
    title: string,
    foreword: string,
    updatedAt: string,
    topic: Topic,
    likeReader: IdName[],
    tags: Tag[],
    readingList?:ReadingList,
    postStatistic: Statistic,
    createdAt: string,
    postLink: string
}