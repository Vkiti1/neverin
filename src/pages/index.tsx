import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { NextPage } from 'next'
import { useAuth } from 'context/auth'
import Link from 'next/link'

const HomePage: NextPage = () => {
  const { login, logout, user } = useAuth()

  return (
    <>
      <Box>
        <Button onClick={user ? logout : login}>
          {user ? 'signOut' : 'signIn'}
        </Button>
        {user && <Link href={`/shop/${user.uid}`}>odi u shop</Link>}
      </Box>
    </>
  )
}

export default HomePage
