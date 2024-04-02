import { PostDetail } from "./PostDetail";

export interface PaginatedPosts {
    content: PostDetail[],
    totalElements: number,
    totalPages: number
}