import { PostCard } from "./PostCard";

export interface PaginatedPosts{
    content:PostCard[],
    totalElements:number,
    totalPages:number
}