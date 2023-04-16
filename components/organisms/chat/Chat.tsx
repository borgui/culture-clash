import ChatMessage from "@/components/atoms/ChatBubble"
import { ChatSendBar } from "@/components/molecules/ChatSendBar"
import { getCurrentRoom, getMessages } from "@/selectors/roomsSelector"
import { sendMessage } from "@/utils/clientSocket"
import { useSelector } from "react-redux"
import { FormEvent } from "react"
import ChatSideBar from "./ChatSideBar"
import { useSession } from "next-auth/react"

const Chat = () => {

    const messages = useSelector(getMessages)
    const session = useSession()
    const room = useSelector(getCurrentRoom)

    const handleSendMessage = (e: FormEvent, message: string) => {
      e.preventDefault()
      if(session.data?.user?.username) sendMessage(session.data.user.username, message, room.id)
    }

    return (
      <>
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-medium text-gray-800">Salle d'attente</h2>
      </div>
      <div className="flex">
        <div className="basis-3/4 flex flex-col">
        {/* Header */}
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto min-h-[20rem] border-4">
            {messages.map((message, index) => 
            <ChatMessage key={index} content={message.content} authorName={message.authorName} creationDate={message.creationDate}/>
            )}
          </div>
          <div className="mt-4">
            <ChatSendBar onSend={handleSendMessage}/>
          </div>
        </div>
        <div className="basis-1/4 ml-4">
            <ChatSideBar/>
        </div>
      </div>
      </>
    )
}

export default Chat