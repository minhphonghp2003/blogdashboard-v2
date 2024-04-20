import { IdName } from "./IdName";
import { User } from "./User"

export interface Search {
    id: number,
    content: any,
    author: User,
    topic: IdName,
    imageLink: string,
    title: string,
    foreword: string,
    updatedAt: string,
}