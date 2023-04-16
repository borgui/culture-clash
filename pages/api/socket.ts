import { Question } from '@/types/question'
import { Room } from '@/types/room'
import { User } from '@/types/user'
import { calculatePlayerScore } from '@/utils/calculators/scoreCalculator'
import { createGame, deleteGame, getGame, updateGameUserScore } from '@/utils/helpers/gameHelper'
import { getRandomQuestions } from '@/utils/helpers/questionHelper'
import { addUserInRoom, createRoom, deleteRoom, deleteUserInRoom, getRoom } from '@/utils/helpers/roomHelper'
import { getCacheValue, getListCacheValue, pushCacheValue } from '@/utils/redis'
import { Server } from 'socket.io'
import { v4 } from 'uuid'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    
    io.on('connection', socket => {    

      //CHAT

      socket.on('join-room', async msg => {
        
        if(!socket.rooms.has(msg.roomId)){
          await socket.join(msg.roomId)
          const user: User = {id: msg.userId, username: msg.username}
          await addUserInRoom(msg.roomId, user)
          socket.to(msg.roomId).emit('connected-user', user)
        }

        const room = await getRoom(msg.roomId)
        io.to(socket.id).emit('get-users', room?.users)
      })

      socket.on('leave-room', async msg => {
        socket.leave(msg.roomId)
        deleteUserInRoom(msg.roomId, msg.userId)
        io.to(msg.roomId).emit('disconnected-user', {userId: msg.userId, roomId: msg.id})
        const room = await getRoom(msg.roomId)
        if(room?.users.length === 0){
          deleteRoom(msg.roomId)
        }
      })

      socket.on('new-message', async msg  => {
        io.to(msg.roomId).emit('new-message', {authorId: msg.userId, authorName: msg.name, content: msg.content})
      })

      // GAME

      const sendQuestion = (roomId: string, currentQuestion: Question, questionNb: number) => {
        io.to(roomId).emit('update-question', {currentQuestion: {...currentQuestion, answer: null}, questionNb})
      }
      
      socket.on('start-game', async msg  => {
        const questions = await getRandomQuestions(10)
        const room = await getRoom(msg.roomId)
        const game = {id: msg.roomId, currentQuestionNb: 0, settings: {questionNb: 10, answerMaxTime: 10000}, questions, users: room?.users.map(user => user.score = 0) ?? []}
        await createGame(game)
        io.to(msg.roomId).emit('game-started', {...game, questions: []})
        sendQuestion(msg.roomId, questions[0], 1)
        let count = 1

        const interval = setInterval(() => {
          if(count >= questions.length){
            io.to(msg.roomId).emit('game-ended', {...game, questions: []})
            deleteGame(msg.roomId)
            clearInterval(interval)
          } else {
            sendQuestion(msg.roomId, questions[count], count + 1)
            count++
          }
        }, game.settings.answerMaxTime + 5000)
      })

      socket.on('user-choice', async msg  => {
        const game = await getGame(msg.gameId)
        const questionIndex = msg.currentQuestionNb - 1
        const user = game?.users.find(user => user.id === msg.userId)
        console.log(user)
        let score = calculatePlayerScore(game?.questions[questionIndex].answer, game?.settings.answerMaxTime, msg.choice, msg.choiceTimeInMs)
        let totalScore = score
        if(user?.score){ totalScore += user.score}
        updateGameUserScore(msg.gameId, msg.userId, totalScore)
        io.to(socket.id).emit('correct-answer', {question: game?.questions[questionIndex], score: totalScore, userId: msg.userId})
        socket.to(msg.gameId).emit('user-answered', {userId: msg.userId, score, totalScore})
      })
    })
  }
  res.end()
}

export default SocketHandler
