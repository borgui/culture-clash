import { getDb } from "@/lib/mongodb"
import { Question } from "@/types/question"
import { ObjectId } from "mongodb"

export const getQuestion = async (id?: string | string[]) => {
    const database = await getDb()
    return database.collection("questions").findOne<Question>({id})
}

export const getQuestions = async () => {
    const database = await getDb()
    return database.collection("questions").find<Question>({}).toArray()
}

export const createQuestion = async (question: Question) => {
    const database = await getDb()
    return database.collection("questions").insertOne(question)
}


export const deleteQuestion = async (id: string) => {
    const database = await getDb()
    return database.collection("questions").deleteOne({_id: new ObjectId(id)})
}

export const getRandomQuestions = async (size: number) => {
    const database = await getDb()
    return database.collection("questions").aggregate<Question>([{ $sample: { size } }]).toArray()
}