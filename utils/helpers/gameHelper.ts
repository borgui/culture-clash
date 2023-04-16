import { getDb } from "@/lib/mongodb"
import { GameDAO } from "@/types/game"
import { ObjectId } from "mongodb"

export const getGame = async (id?: string | string[]) => {
    const database = await getDb()
    return database.collection("games").findOne<GameDAO>({id})
}

export const createGame = async (game: GameDAO) => {
    const database = await getDb()
    return database.collection("games").insertOne(game)
}

export const deleteGame = async (id: string) => {
    const database = await getDb()
    return database.collection("games").deleteMany({id})
}

export const updateGameUserScore = async (id: string, userId: string, score: number) => {
    const database = await getDb()
    return database.collection("games").updateOne({id, "users.id": userId}, { $set: { "users.$.score" : score}})
}