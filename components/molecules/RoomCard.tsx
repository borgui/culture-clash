import { useRouter } from 'next/router';
import { Button, Card, Input } from 'react-daisyui'
import { v4 } from 'uuid';

const RoomCard = () => {
    const router = useRouter()
    let roomId = ''
    const createRoom = async () => {
        const roomId = v4()
        fetch('/api/rooms', {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({room: {id: roomId, users: []}})})
        router.push(`/rooms/${roomId}`)
    }

    const joinRoom = () => {
        roomId ? router.push(`/rooms/${roomId}`) : null
    }

return (<Card className='flex flex-col align-items-center items-center'>
      <Card.Image
        src="https://api.lorem.space/image/shoes?w=400&h=225"
        alt="Shoes"
      />
      <Card.Body>
        <Card.Title tag="h2">Shoes!</Card.Title>
        <p>Jouer dés maintenant à culture clash</p>
        <Button color="primary" onClick={createRoom}>Créer un salon</Button>
        <Input placeholder='Id de salon à rejoindre' onChange={(e) => roomId = e.target.value}></Input>
        <Button color="primary" onClick={joinRoom} >Rejoindre le salon</Button>
      </Card.Body>
    </Card>
)
}

export default RoomCard