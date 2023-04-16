import Head from 'next/head'
import { Inter } from 'next/font/google'
import Login from '@/components/organisms/Login'
import { Button } from 'react-daisyui'
import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import RoomCard from '@/components/molecules/RoomCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [visible, setVisible] = useState(false)
  const onLoginClick = () => {
    setVisible(true)
    console.log(visible)
  }

  const session = useSession()
    return (
      <>
        <div className='h-full'>

          {!session.data && session.status != "loading" && <Button color='primary' onClick={onLoginClick}>Login</Button>}
          {session && session.data && <RoomCard/>}
          {visible && <Login/> }
  
          
        </div>
      </>
    )


}
