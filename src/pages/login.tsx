import { NextPage } from 'next'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { ChangeEventHandler, useState } from 'react'
import { AuthButton } from 'components/AuthButton'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  return (
    <>
      <FormControl id='email' isRequired>
        <FormLabel>Email address</FormLabel>
        <Input onChange={handleEmailInput} type='email' />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <Input onChange={handlePasswordInput} type='password' />
      </FormControl>
      <AuthButton email={email} password={password} />
    </>
  )
}

export default Login
