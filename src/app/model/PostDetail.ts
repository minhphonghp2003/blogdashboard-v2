import { PostCard } from "./PostCard";

interface Statistic {
    shareCount: number,
    viewCount: number
}


export interface PostDetail extends PostCard {
    postStatistic: Statistic,
    createdAt: string,
    postLink: string
}