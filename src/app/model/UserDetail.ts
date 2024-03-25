import { IdName } from "./IdName";
import { UserInformation } from "./UserInformation";

export interface UserDetail {
    status: IdName,
    roles: IdName[]
    username: string,
    email: string,
    userInformation: UserInformation
}