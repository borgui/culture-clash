import { Message } from "@/types/room"
import { ChatBubble } from "react-daisyui"

type Props = {
    content: string,
    authorName: string,
    creationDate: string
}

const ChatMessage = ({content, authorName, creationDate}: Props) => (
<>
<ChatBubble end>
  <ChatBubble.Header>
    {authorName} <ChatBubble.Time>{creationDate}</ChatBubble.Time>
  </ChatBubble.Header>
  <ChatBubble.Message color="info">{content}</ChatBubble.Message>
</ChatBubble>
</>
)

export default ChatMessage