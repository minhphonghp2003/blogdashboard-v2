import { IdName } from "./IdName";



export interface Role extends IdName {
    color?: string,
    actions: IdName[]
}