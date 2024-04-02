export interface Comment {
    id?: string,
    postId: number,
    userId: string,
    fullName: string,
    text: string,
    parentCommentId?: string
    replies?: Comment[]
}