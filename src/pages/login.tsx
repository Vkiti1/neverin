import { NextPage } from 'next'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { ChangeEventHandler, useState } from 'react'
import { AuthButton } from 'components/AuthButton'
import { Box, Flex } from '@chakra-ui/react'

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
      <Flex
        m='auto'
        direction='column'
        w='500px'
        boxShadow='0px 4px 10px 1px rgba(0,0,0,0.7)'
        transform='translate(0, 100%)'
      >
        <FormControl p={4} bg='accent' id='email' isRequired>
          <FormLabel color='white'>Email address</FormLabel>
          <Input color='white' onChange={handleEmailInput} type='email' />
        </FormControl>
        <FormControl p={4} bg='accent' id='password' isRequired>
          <FormLabel color='white'>Password</FormLabel>
          <Input
            color='white'
            onChange={handlePasswordInput}
            type='password'
            mb={4}
          />
          <AuthButton email={email} password={password} />
        </FormControl>
      </Flex>
    </>
  )
}

export default Login
