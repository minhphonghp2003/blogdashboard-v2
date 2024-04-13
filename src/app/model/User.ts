import { IdName } from "./IdName"
import { Role } from "./Role"

export interface User {
    avatar: string,
    id: string,
    fullName: string
    roles: Role[],
    phone: string,
    status: IdName,
    credential: { email: string, username: string }

}