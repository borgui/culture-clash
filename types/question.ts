import { ObjectId } from "mongodb"

export type Question = {
    _id?: ObjectId,
    type: number,
    content: string,
    choices?: string[],
    answer: string,
    explaination?: string
    theme: number,
    difficulty: number,
    filePath?: string,
}