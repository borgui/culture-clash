import { addRoomUser, removeRoomUser, setMessage, setRoomUsers } from '@/reducers/roomsReducer';
import { Message } from '@/types/room';
import { Socket } from 'socket.io';
import store from '../store/store'
import io from 'Socket.IO-client'
import { setCurrentChoice, setCurrentQuestion, setCurrentQuestionNb, setGame, setGameEnded, setUserScore } from '@/reducers/gameReducer';
import { Question } from '@/types/question';

export let socket: Socket

export const socketInitializer = async () => {

    await fetch('/api/socket')
    socket = io()
    socket.on('get-users', (msg) => {
      store.dispatch(setRoomUsers(msg))
    })
    socket.on('connected-user', (msg) => {
      store.dispatch(addRoomUser(msg))
    })
    socket.on('disconnected-user', (msg) => {
      store.dispatch(removeRoomUser(msg.userId))
    })

    socket.on('new-message', (msg: Message) => {
      store.dispatch(setMessage(msg))
    })

    socket.on('game-started', (msg: Message) => {
      store.dispatch(setGame(msg))
    })

    socket.on('update-question', (msg: {currentQuestion: Question, questionNb: number}) => {
      store.dispatch(setCurrentChoice(undefined))
      store.dispatch(setCurrentQuestion(msg.currentQuestion))
      store.dispatch(setCurrentQuestionNb(msg.questionNb))
    })

    socket.on('correct-answer', (msg: {question: Question, score: number, userId: string}) => {
      store.dispatch(setCurrentQuestion(msg.question))
      store.dispatch(setUserScore({score: msg.score, userId: msg.userId}))
    })

    socket.on('user-answered', (msg: {totalScore: number, score: number, userId: string}) => {
      store.dispatch(setUserScore({score: msg.totalScore, userId: msg.userId}))
    })

    socket.on('game-ended', () => {
      store.dispatch(setGameEnded(true))
    })
}

export const sendMessage = async (name: string, content: string, roomId: string) => {
  socket.emit('new-message', {name, content, roomId, creationDate: new Date()})
}

export const sendUserChoice = async (userId: string, gameId: string, currentQuestionNb: number, choice: string, choiceTimeInMs: number ) => {
  socket.emit('user-choice', {userId, gameId, currentQuestionNb, choice, choiceTimeInMs})
}

export const sendStartGame = async (roomId: string) => {
  socket.emit('start-game', {roomId})
}