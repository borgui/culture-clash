import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  isLoading: boolean,
  username: string
}

const initialState: CounterState = {
  isLoading: false,
  username: ""
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getInPending: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = true
    },
    getSucceed: (state, action: PayloadAction<any>) => {
      state.username = action.payload.username
    },
  },
})

// Action creators are generated for each case reducer function
export const { getInPending, getSucceed } = userSlice.actions

export default userSlice.reducer