import { IdName } from "./IdName";

export interface ReadingList extends IdName {
    image: string,
    description: string,
    status?: string
}