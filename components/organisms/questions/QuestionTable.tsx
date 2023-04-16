import { useState } from 'react'
import TrashIcon from "@/components/icons/TrashIcon";
import { Question } from "@/types/question";
import { Button, Table } from "react-daisyui";
import { QUESTION_TYPES, getQuestionDifficulty, getQuestionTheme, getQuestionType } from '@/constants/Question';

type Props = {
    questionsData: Question[]
}

export default function QuestionTable({questionsData}: Props){
    const [questions, setQuestions] = useState(questionsData)

    const onRemove = async (id?: string) => {
        const res = await fetch('/api/questions', {method: 'DELETE', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})})
        setQuestions(questions.filter(question => question._id?.toString() !== id))
     }

    return (
    <div className='overflow-x-auto'>
    <Table>
      <Table.Head>
        <span>Id</span>
        <span>Type</span>
        <span>Theme</span>
        <span>Question</span>
        <span>Choices</span>
        <span>Answer</span>
        <span>Difficulty</span>
        <span>File path</span>
        <span>Remove</span>
      </Table.Head>

      <Table.Body>
        {questions.map(question => {
            return (<Table.Row key={question._id?.toString()}> 
            <span>{question._id?.toString()}</span>
            <span>{getQuestionType(question.type)}</span>
            <span>{getQuestionTheme(question.theme)}</span>
            <span>{question.content}</span>
            <span>{question.choices?.map(choice => `${choice} `)}</span>
            <span>{question.type === QUESTION_TYPES[0].id ? question.choices?.[+question.answer] : question.answer }</span>
            <span>{getQuestionDifficulty(question.difficulty)}</span>
            <span>{question.filePath}</span>
            <span><Button onClick={() => onRemove(question._id?.toString())}><TrashIcon/></Button></span>
        </Table.Row>)
        })}
      </Table.Body>
    </Table>
  </div>
    )
}