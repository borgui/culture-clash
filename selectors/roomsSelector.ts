import { RootState } from "@/store/store"
import { createSelector } from "@reduxjs/toolkit"

const roomsState = (state: RootState) => state.rooms
const getRooms = createSelector(roomsState, (state) => state.rooms)
export const getRoomById = (roomId: string | string[] | undefined) => createSelector(getRooms, (rooms) => rooms.find(room => room.id == roomId))
export const getCurrentRoom = createSelector(getRooms, (rooms) => rooms[0])

export const getMessages = createSelector(getCurrentRoom, (room) => room?.messages ?? [])
export const getRoomUsers = createSelector(getCurrentRoom, (room) => room?.users ?? [])