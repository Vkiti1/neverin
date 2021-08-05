import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useRouter } from 'next/router'

export const Header: FC = () => {
  const router = useRouter()
  return (
    <Flex p={4} bg='accent' as='header' w='100%' justifyContent='flex-end'>
      <Button
        fontSize='xl'
        bg='background'
        color='text'
        onClick={() => router.push('/login')}
      >
        Login
      </Button>
    </Flex>
  )
}
