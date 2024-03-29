import { IdName } from "./IdName";

export interface Topic extends IdName {
    icon: string,
    description: string,
    status?:string
}