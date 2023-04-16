import { getDb } from "@/lib/mongodb"
import { Room } from "@/types/room"
import { User } from "@/types/user"

export const getRoom = async (id?: string | string[]) => {
    const database = await getDb()
    return database.collection("rooms").findOne<Room>({id})
}

export const createRoom = async (room: Room) => {
    const database = await getDb()
    return database.collection("rooms").insertOne(room)
 }

 export const deleteRoom = async (id?: string | string[]) => {
    const database = await getDb()
    return database.collection("rooms").deleteOne({id})
 }

 export const addUserInRoom = async (roomId: string, user: User) => {
    const database = await getDb()
    return database.collection("rooms").updateOne({id: roomId}, {$push: {users: user}})
 }

 export const deleteUserInRoom = async (roomId: string, userId: string) => {
    const database = await getDb()
    return database.collection("rooms").updateOne({id: roomId}, {$pop: {users: {id: userId}}})
 }