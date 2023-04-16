import { setTimeleft } from "@/reducers/gameReducer";
import { getGameTimeLeft } from "@/selectors/gameSelector";
import { useEffect, useState } from "react";
import { Progress } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";

type Props = {
    timeInMs: number,
    startTimer: boolean,
    className: string
}

export default function TimeLeft({timeInMs, startTimer, className}: Props) {
    const dispatch = useDispatch()
    const timeLeft = useSelector(getGameTimeLeft)
    let value = timeInMs
    let timer: NodeJS.Timer | undefined = undefined

    useEffect(() => {
        dispatch(setTimeleft(timeInMs))
    }, [])

    useEffect(() => {
        if(startTimer){
            timer = setInterval(() => {
                console.log(value)
                value = value - 10
                if(value <= 0){
                    dispatch(setTimeleft(0))
                    clearInterval(timer)
                } else {
                    dispatch(setTimeleft(value))
                }
            }, 10);
        } else {
            clearInterval(timer)
        }
    }, [startTimer])

    return (
        <Progress color='success' className={className} max={timeInMs} value={timeLeft} />
    )

}