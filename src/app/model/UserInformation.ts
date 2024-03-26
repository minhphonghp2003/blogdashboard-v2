import { UserSocial } from "./UserSocial";

export interface UserInformation{
    id:string,
    phone:string,
    fullName:string,
    bio:string,
    avatar?:string,
    socials:UserSocial[]

}