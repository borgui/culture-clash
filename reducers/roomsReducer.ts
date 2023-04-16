import type { PayloadAction } from '@reduxjs/toolkit'
import type { Message, Room } from '@/types/room'

import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types/user'

export interface RoomState {
  isLoading: boolean,
  rooms: Room[],
}

const initialState: RoomState = {
  isLoading: false,
  rooms: []
}

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.rooms = [{id: action.payload.roomId, users: [], messages: []}]
    },
    setMessage: (state, action: PayloadAction<Message>) => {
      state.rooms[0] = {...state.rooms[0], messages: [...state.rooms[0].messages, action.payload]}
    },
    setRoomUsers: (state, action: PayloadAction<User[]>) => {
      state.rooms[0] = {...state.rooms[0], users: action.payload}
    },
    addRoomUser: (state, action: PayloadAction<User>) => {
    state.rooms[0] = {...state.rooms[0], users: [...state.rooms[0].users, action.payload]}
    },
    removeRoomUser: (state, action: PayloadAction<string>) => {
      state.rooms[0].users = state.rooms[0].users.filter(user => user.id !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRoom, setMessage, setRoomUsers, addRoomUser, removeRoomUser } = roomSlice.actions

export default roomSlice.reducer