import { Role } from "./Role";

export interface NewUser {
    username?: string,
    password?: string,
    email?: string,
    roles?: any[],
    status?: "ACTIVE",
    phone?: string,
    fullName?: string
}