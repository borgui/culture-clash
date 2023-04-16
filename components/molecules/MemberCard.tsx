import { User } from "@/types/user"
import { Member } from "../atoms/Member"

type Props = {
    user: User
}

export default function MemberCard({user}: Props){
    return (
        <Member user={user}/>
    )

}