import { User } from "./user"

export type Room = {
    id: string,
    users: User[],
    messages?: Message[]
}

export type Message = {
    creationDate: string
    authorId: string,
    authorName: string,
    content: string
}