import { IdName } from "./IdName";
import { Role } from "./Role";
import { UserInformation } from "./UserInformation";

export interface UserDetail {
    status: IdName,
    roles: Role[]
    username: string,
    email: string,
    userInformation: UserInformation
}