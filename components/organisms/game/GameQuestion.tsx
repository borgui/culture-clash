import { getCurrentGameId, getCurrentGameSettings, getCurrentQuestion, getCurrentQuestionNb, getGameTimeLeft } from "@/selectors/gameSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MULTIPLE_CHOICE_TYPE_ID, QUESTION_TYPES } from "@/constants/Question";
import MultipleChoices from "@/components/molecules/questions/MultipleChoices";
import TimeLeft from "@/components/atoms/TimeLeft";
import QuestionCount from "@/components/atoms/QuestionCount";
import { sendUserChoice } from "@/utils/clientSocket";
import { useSession } from "next-auth/react";
import { setCurrentChoice } from "@/reducers/gameReducer";

export default function GameQuestion(){
    const currentQuestion = useSelector(getCurrentQuestion)
    const questionNb = useSelector(getCurrentQuestionNb)
    const gameId = useSelector(getCurrentGameId)
    const settings = useSelector(getCurrentGameSettings)
    const timeLeft = useSelector(getGameTimeLeft)
    const dispatch = useDispatch()
    const session = useSession()
    const [startTimer, setStartTimer] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setStartTimer(true)
        }, 3000);
    }, [])

    const onUserAnswer = (choice: string) => {
        setStartTimer(false)
        dispatch(setCurrentChoice(choice))
        session.data?.user.id && gameId && sendUserChoice(session.data?.user.id, gameId, questionNb, choice, timeLeft)
    }

    const renderQuestionComponent = () => {
        switch(currentQuestion?.type){
            case MULTIPLE_CHOICE_TYPE_ID:
                return <MultipleChoices question={currentQuestion} onUserAnswer={onUserAnswer}/>
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-1/2 flex-row">
                <TimeLeft className="basis-4/5" timeInMs={settings.answerMaxTime} startTimer={startTimer}/>
                <QuestionCount className="basis-1/5"/>
            </div>
            <div className="w-1/2">
                {renderQuestionComponent()}
            </div>
        </div>
    )
}