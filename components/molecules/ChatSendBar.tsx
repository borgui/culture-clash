import { getCurrentRoom, getRoomById } from "@/selectors/roomsSelector"
import { sendMessage } from "@/utils/clientSocket"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { Button } from "react-daisyui"
import { useSelector } from "react-redux"
import {Input} from "react-daisyui"

type Props = {
    onSend: Function
}
export const ChatSendBar = ({onSend}: Props) => {
    const [message, setMessage] = useState('')

    const handleSendMessage = (e: FormEvent) => {
        onSend(e, message)
        setMessage('')
    }

    return (
            <form className="form flex flex-row gap-[2.75rem]">
                <Input className="basis-3/4" onChange={(e) => setMessage(e.target.value)} value={message}/>
                <Button onClick={handleSendMessage} className="basis-1/4">Envoyer</Button>
            </form>
    )
}