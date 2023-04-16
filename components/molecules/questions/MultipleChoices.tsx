import TimeLeft from "@/components/atoms/TimeLeft"
import { getCurrentChoice, getCurrentQuestion } from "@/selectors/gameSelector"
import { Question } from "@/types/question"
import Image from "next/image"
import { Button } from "react-daisyui"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { socket } from "@/utils/clientSocket"

type Props = {
    question: Question
    onUserAnswer: Function
}

export default function MultipleChoices({question, onUserAnswer}: Props){
    const currentChoice = useSelector(getCurrentChoice)
    const currentQuestion = useSelector(getCurrentQuestion)
    const [choicedBtnColor, setChoicedBtnColor] = useState<"success" | "error" | undefined>()
    const [isDisabled, setDisabled] = useState(false)

    const getBtnColor = (btnValue: string): "success" | "error" | undefined => {
        if(currentChoice == btnValue){
            return choicedBtnColor
        } else if(currentQuestion?.answer == btnValue) {
            return "success"
        } else {
            return undefined
        }
    }

    const onBtnClick = (choice: string) => {
        if(!isDisabled) onUserAnswer(choice)
        setDisabled(true)
    }

    useEffect(() => {
        setDisabled(false)
    }, [])

    useEffect(() => {
        if(currentChoice && currentQuestion?.answer){
            if(currentChoice == currentQuestion.answer){
                setChoicedBtnColor("success")
            } else {
                setChoicedBtnColor("error")
            }
        }
    }, [currentChoice, currentQuestion])
    return (
        <div className="flex flex-col items-center w-full">
            <h2>{question.content}</h2>
            {question.filePath && <Image alt="question_image" src={question.filePath}></Image>}
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <Button color={getBtnColor('0')} animation={!isDisabled} onClick={() => onBtnClick('0')}>{question.choices?.[0]}</Button>
                <Button color={getBtnColor('1')} animation={!isDisabled} onClick={() => onBtnClick('1')}>{question.choices?.[1]}</Button>
                <Button color={getBtnColor('2')} animation={!isDisabled} onClick={() => onBtnClick('2')}>{question.choices?.[2]}</Button>
                <Button color={getBtnColor('3')} animation={!isDisabled} onClick={() => onBtnClick('3')}>{question.choices?.[3]}</Button>
            </div>
        </div>
    )
}