import { getCurrentGameSettings, getCurrentQuestionNb } from "@/selectors/gameSelector"
import { useSelector } from "react-redux"

type Props = {
    className: string
}
export default function QuestionCount({className}: Props){
    const currentQuestionNb = useSelector(getCurrentQuestionNb)
    const settings = useSelector(getCurrentGameSettings)
    return (
        <span className={className}>
            {currentQuestionNb}/{settings?.questionNb}
        </span>
    )
}