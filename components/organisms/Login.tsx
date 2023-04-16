import { Button, Input, Modal } from 'react-daisyui'
import { FormEvent, MouseEventHandler, useState } from 'react' 
import { signIn } from 'next-auth/react'
import { socketInitializer } from '@/utils/clientSocket'
import { useDispatch } from 'react-redux'
import { setUser } from '@/reducers/userReducer'

type Props = {
}

const Login = ({}: Props) => {
  let username = ""
  const [visible, setVisible] = useState(true)
  const dispatch = useDispatch()
  const onValidate = async (e: FormEvent) => {
    e.preventDefault()
    await signIn("credentials", { username, redirect: false })
    setVisible(false)
    dispatch(setUser(username))
  }

    return (
      <Modal open={visible}>
      <Modal.Header>
        Login
      </Modal.Header>
      <form>
      <Modal.Body>
        <Input onChange={(e) => username = e.target.value} placeholder='Your name'/>
      </Modal.Body>

      <Modal.Actions>
        <Button onClick={onValidate}>Validate</Button>
      </Modal.Actions>
      </form>
    </Modal>
    )
  
}

export default Login
