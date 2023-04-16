import GameLeaderBoard from "@/components/organisms/game/GameLeaderBoard";
import GameQuestion from "@/components/organisms/game/GameQuestion";
import { getCurrentQuestion, getGameEnded } from "@/selectors/gameSelector";
import { socket } from "@/utils/clientSocket";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetGame } from "@/reducers/gameReducer";

export default function Game() {

    const currentQuestion = useSelector(getCurrentQuestion)
    const ended = useSelector(getGameEnded)
    const router = useRouter()
    const dispatch = useDispatch()

    const renderComponent = () => {
        /*if(!ended && currentQuestion)*/ return <GameQuestion/>
        if(ended) return <GameLeaderBoard/>
        return <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"/>
    }
    
    const handleRouteChange = (url: string) => {
      dispatch(resetGame())
    }
    
  useEffect(() => {
    if(socket != null){
      router.events.on('routeChangeStart', handleRouteChange);

      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      }
    }
  }, [socket])
  
    return (
        <div className="flex w-full justify-center">
            {renderComponent()}
        </div>
      )
}