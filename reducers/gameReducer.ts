import type { PayloadAction } from '@reduxjs/toolkit'
import type { Game } from '@/types/game'

import { createSlice } from '@reduxjs/toolkit'

export interface GameState {
  isLoading: boolean,
  game: Game
}

const initialState: GameState = {
  isLoading: false,
  game: {
    id: undefined,
    settings: {
      questionNb: 0,
      answerMaxTime: 10000
    },
    currentQuestionNb: 0,
    users: [],
    timeLeft: 10000,
    ended: false,
  }
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<any>) => {
      state.game = action.payload
    },
    setCurrentQuestion: (state, action: PayloadAction<any>) => {
      state.game = {...state.game, currentQuestion: action.payload}
    },
    setCurrentQuestionNb: (state, action: PayloadAction<any>) => {
      state.game = {...state.game, currentQuestionNb: action.payload}
    },
    setCurrentChoice: (state, action: PayloadAction<any>) => {
      state.game.currentChoice = action.payload
    },
    setUserScore: (state, action: PayloadAction<any>) => {
      const userIndex = state.game.users.findIndex(users => users.id == action.payload.userId)
      state.game.users[userIndex].score = action.payload.score
    },
    setTimeleft: (state, action: PayloadAction<number>) => {
      state.game.timeLeft = action.payload
    },
    setGameEnded: (state, action: PayloadAction<boolean>) => {
      state.game.ended = action.payload
    },
    resetGame: (state) => {
      state.game = initialState.game
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGame, setCurrentQuestion, setCurrentQuestionNb, setCurrentChoice, setUserScore, setTimeleft, setGameEnded, resetGame } = gameSlice.actions

export default gameSlice.reducer