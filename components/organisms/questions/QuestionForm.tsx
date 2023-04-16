import RadioInput from "@/components/molecules/RadioInput"
import { QUESTION_DIFFICULTIES, QUESTION_THEMES, QUESTION_TYPES } from "@/constants/Question"
import { Question } from "@/types/question"
import { useState, ChangeEvent, FormEvent } from "react"
import { Alert, Button, Form, Input, Radio, Select, Toast } from "react-daisyui"

export const QuestionForm = () => {
    const [type, setType] = useState<number>(1)
    const [difficulty, setDifficulty] = useState<number>(1)
    const [theme, setTheme] = useState<number>(1)
    const [content, setContent] = useState('')
    const [choices, setChoices] = useState<string[]>([])
    const [answer, setAnswer] = useState('0')

    const [explaination, setExplaination] = useState('')
    const [sendSucceed, setSendSucceed] = useState(false)

    const sendQuestion = async (e: FormEvent) => {
        e.preventDefault()
        if(type && difficulty && theme){
            const question: Question = {type, difficulty, theme, content, choices, answer, explaination}
            const res = await fetch('/api/questions', {method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({question})})
            if(res.status == 200){
                setSendSucceed(true)
            }
        
        } 
    }
    const onChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
        setType(+event.target.value)
        if(+event.target.value === QUESTION_TYPES[0].id){
            setAnswer('0')
        } else {
            setAnswer('')
        }
    }

    const onChangeChoices = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        console.log(event.target.value)
        choices[index] = event.target.value
        setChoices(choices)
    }

    const MultipleChoices = () => {
        return (
        <div>
            {[0,1,2,3].map(value => {
             return (<RadioInput key={value} checked={value.toString() === answer} placeHolder={`Choix ${value + 1}`} name="response" 
             onInputChange={(event: ChangeEvent<HTMLInputElement>) => onChangeChoices(event, value)} 
             onRadioChange={() => setAnswer(value.toString())} />
             )})
            }
        </div>    
        )
    }

    return (
        <Form>
            <label htmlFor="type" className="label">
                <span className="label-text">Type de question</span>
             </label>
            <Select name="type" value={type} onChange={onChangeType}>
                {QUESTION_TYPES.map(questionType => {
                    return (<option value={questionType.id}>
                                    {questionType.name}
                                </option>)
                })}
            </Select>
            <label className="label">
                <span className="label-text">Difficulté</span>
             </label>
            <Select value={difficulty} onChange={(event) => setDifficulty(+event.target.value)}>
                {QUESTION_DIFFICULTIES.map(questionDifficulty => {
                    return (<option value={questionDifficulty.id}>
                                    {questionDifficulty.name}
                                </option>)
                })}
            </Select>
            <label className="label">
                <span className="label-text">Theme</span>
             </label>
            <Select value={theme} onChange={(event) => setTheme(+event.target.value)}>
                {type !== 3 ? QUESTION_THEMES.map(questionTheme => {
                    return (<option value={questionTheme.id}>
                                    {questionTheme.name}
                                </option>)
                    })
                    : <option value={QUESTION_THEMES[0].id}>
                                {QUESTION_THEMES[0].name}
                            </option>
                }
            </Select>
            <label htmlFor="question" className="label">
                <span className="label-text">Question</span>
             </label>
            <Input name="question" placeholder="Votre question" onChange={(event) => setContent(event.target.value)}/>
            <label className="label">
                <span className="label-text">Réponse(s)</span>
             </label>
            {type == QUESTION_TYPES[0].id ?
              <MultipleChoices/>
            : 
            <Input placeholder="Réponse" onChange={(event) => setAnswer(event.target.value)}/>
            }
            <label className="label">
                <span className="label-text">Explication ou anecdote</span>
             </label>
            <Input placeholder="Explication" onChange={(event) => setExplaination(event.target.value)}/>
            <Button className="mt-4" onClick={sendQuestion}>Créer</Button>
            {sendSucceed && <Alert className="mt-4" status="success">Message sent successfully.</Alert>}
        </Form>
    )
}