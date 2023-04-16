import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react";
import { Button } from "react-daisyui";


type Props = {
    children: ReactElement<any, any>
  }

export default function QuestionsLayout({ children }: Props) {

    const router = useRouter()

    return (
      <>
      <div className="flex">
        <div className="basis-1/2">
            <Button onClick={() => router.push('/questions')}>Voir</Button>
        </div>
        <div className="basis-1/2">
            <Button onClick={() => router.push('/questions/new')}>Créer</Button>
        </div>
      </div>
      <div className="w-full pr-10 pl-10 mt-5">
        {children}
      </div>
    </>
    )
  }