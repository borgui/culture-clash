import { Member } from "@/components/atoms/Member";
import { getCurrentGameId, getGameUsers } from "@/selectors/gameSelector";
import { getCurrentRoom } from "@/selectors/roomsSelector";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/router";
import { Badge, Button, Mask, Table } from "react-daisyui";
import { useSelector } from "react-redux";

export default function GameLeaderBoard() {
    let users = useSelector(getGameUsers)
    let room = useSelector(getCurrentRoom)
    const router = useRouter()
    const usersSort = [...users]
    usersSort.sort((a, b) => {
            if(a.score == undefined || b.score == undefined){
                return 0
            }
            if(a.score > b.score){
                return 1
            }
            return a.score < b.score ? - 1 : 0
    })

    const getIconByPosition = (position: number) => {
        if(position == 1) return <Image alt="1" src="/images/1trophy.png" width="50" height="50"/>
        if(position == 2) return <Image alt="2" src="/images/2trophy.png" width="50" height="50"/>
        if(position == 3) return <Image alt="3" src="/images/3trophy.png" width="50" height="50"/>
        return <span>{position}</span>
    }

    const onExitClick = () => {
        router.push(`/rooms/${room.id}`)
    }

    return (
    <div className='overflow-x-auto flex justify-center flex-col w-1/3'>
      <Table className="rounded-box text-center">
        <Table.Head>
          <span>Classement</span>
          <span>Joueur</span>
          <span>Score</span>
        </Table.Head>

        <Table.Body>
            {usersSort.map((user, index) => {
                return (
                <Table.Row>
                <div>
                  {getIconByPosition(index + 1)}
                </div>
                <Member user={user}/>
                <div className="font-bold">{user.score}</div>
              </Table.Row>)
            })}
        </Table.Body>
      </Table>

      <Button onClick={onExitClick}>Retourner au salon</Button>
    </div>
    )

}