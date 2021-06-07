import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { NextPage } from 'next'
import { useAuth } from 'context/auth'

const HomePage: NextPage = () => {
  const { login, logout, user } = useAuth()

  return (
    <>
      <Box>
        <Button onClick={user ? logout : login}>
          {user ? 'signOut' : 'signIn'}
        </Button>
      </Box>
    </>
  )
}

export default HomePage
