import { RootState } from "@/store/store"
import { createSelector } from "@reduxjs/toolkit"

const gameState = (state: RootState) => state.game
const getCurrentGame = createSelector(gameState, (state) => state.game)
export const getCurrentGameId = createSelector(getCurrentGame, (game) => game.id)
export const getCurrentGameSettings = createSelector(getCurrentGame, (game) => game.settings)
export const getCurrentQuestion = createSelector(getCurrentGame, (game) => game?.currentQuestion)
export const getCurrentQuestionNb = createSelector(getCurrentGame, (game) => game?.currentQuestionNb)
export const getCurrentChoice = createSelector(getCurrentGame, (game) => game?.currentChoice)
export const getGameTimeLeft = createSelector(getCurrentGame, (game) => game?.timeLeft)
export const getGameUsers = createSelector(getCurrentGame, (game) => game?.users)
export const getGameEnded = createSelector(getCurrentGame, (game) => game?.ended)
