import Chat from "@/components/organisms/chat/Chat"
import { addRoomUser, removeRoomUser, setMessage, setRoom, setRoomUsers } from "@/reducers/roomsReducer"
import { getCurrentGameId } from "@/selectors/gameSelector"
import { getRoomById } from "@/selectors/roomsSelector"
import { Message } from "@/types/room"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from "react-daisyui"
import { useDispatch, useSelector } from "react-redux"
import { sendStartGame, socket } from "../../utils/clientSocket"

export default function Room() {
  const router = useRouter()
  const gameId = useSelector(getCurrentGameId)
  const { id } = router.query
  
  const dispatch = useDispatch()
  const session = useSession()

  const onStartClick = () => {
    id && !Array.isArray(id) && sendStartGame(id)
  }

  const handleRouteChange = (url: string) => {
    if(url != `/game/${id}`){
      socket.emit('leave-room', {roomId: id, userId: session.data?.user.id, username: session.data?.user.username})
    }
  }

  useEffect(() => {
    if(socket != null){
      socket.emit('join-room', {roomId: id, userId: session.data?.user.id, username: session.data?.user.username}) 
      router.events.on('routeChangeStart', handleRouteChange);

      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      }
    }
  }, [socket])

  useEffect(() => {
      dispatch(setRoom({roomId: id}))
  }, [])


  useEffect(() => {
    if(gameId){
      router.push(`/game/${id}`)
    }
  }, [gameId])

  
    return (
      <>
        <Chat/>
        <Button onClick={onStartClick}>Démarrer</Button>
      </>
    )
  }