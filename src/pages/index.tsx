import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { NextPage } from 'next'
import { useAuth } from 'context/auth'
import Link from 'next/link'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { useState } from 'react'
import Login from 'pages/login'

const HomePage: NextPage = () => {
  const { login, logout, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailInput = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handlePasswordInput = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  return (
    <>
      {/* <Box>
        <Button onClick={user ? logout : login}>
          {user ? 'signOut' : 'signIn'}
        </Button>
        {user && <Link href={`/shop/${user.uid}`}>odi u shop</Link>}
      </Box> */}
      <Login />
    </>
  )
}

export default HomePage
