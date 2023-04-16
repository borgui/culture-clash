import QuestionsLayout from "@/components/layouts/QuestionLayout"
import QuestionTable from "@/components/organisms/questions/QuestionTable"
import { Question } from "@/types/question"

export default function Questions({questions}: {questions: Question[]}) {
    return (
        <QuestionsLayout>
        <div className="flex">
            <QuestionTable questionsData={questions}/>
        </div>
        </QuestionsLayout>
    )
}


export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/questions')
    const questions: Question[] = await res.json()
    return {
      props: {questions}, // will be passed to the page component as props
    }
  }