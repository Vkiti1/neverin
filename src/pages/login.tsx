import { NextPage } from 'next'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { ChangeEventHandler, useState } from 'react'
import { AuthButton } from 'components/AuthButton'
import { Box } from '@chakra-ui/react'

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
    <Box w='50%' m='auto auto'>
      <FormControl p={4} bg='accent' id='email' isRequired>
        <FormLabel color='white'>Email address</FormLabel>
        <Input onChange={handleEmailInput} type='email' />
      </FormControl>
      <FormControl p={4} bg='accent' id='password' isRequired>
        <FormLabel color='white'>Password</FormLabel>
        <Input onChange={handlePasswordInput} type='password' />
        <AuthButton email={email} password={password} />
      </FormControl>
    </Box>
  )
}

export default Login
