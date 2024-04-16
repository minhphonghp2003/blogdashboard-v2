import { IdName } from "./IdName";



export interface Role extends IdName {
    color?: any,
    actions: IdName[]
}