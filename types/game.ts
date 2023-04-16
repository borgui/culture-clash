import { ObjectId } from "mongodb"
import { Question } from "./question"
import { User } from "./user"

export type Settings = {
    questionNb: number,
    answerMaxTime: number
}

export type Game = {
    id?: string,
    settings: Settings,
    users: User[]
    currentQuestion?: Question
    currentQuestionNb: number
    currentChoice?: string
    timeLeft: number
    ended?: boolean
}

export type GameDAO = {
    _id?: ObjectId,
    id?: string,
    settings: Settings,
    users: User[]
    questions: Question[]
}