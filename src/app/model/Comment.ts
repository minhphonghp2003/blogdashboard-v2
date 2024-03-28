export interface Comment {
    id: string,
    userId: string,
    fullName: string,
    text: string,
    replies: Comment[]
}