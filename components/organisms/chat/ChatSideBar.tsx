import { Member } from "@/components/atoms/Member"
import { getRoomUsers } from "@/selectors/roomsSelector"
import { useSelector } from "react-redux"

const ChatSideBar = () => {

    const users = useSelector(getRoomUsers)
    return (
    <div className="flex flex-col">
        {users.map((user, index) =>
        <div className={index != 0 ? 'mr-4' : ''}>
            <Member user={user}/>
        </div>
        )}
    </div>
    )
}

export default ChatSideBar