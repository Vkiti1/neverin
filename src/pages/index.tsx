import { Box, Flex, Heading } from '@chakra-ui/layout'
import { NextPage } from 'next'
import Link from 'next/link'
import { useAuth } from 'context/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Text } from '@chakra-ui/react'
import { Header } from 'components/landing-page/Header'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user && !user.isAnonymous) {
      router.push(`/shop/${user.uid}`)
    }
  }, [user])

  return (
    <>
      <Header />
      <Flex
        h='calc(100vh - 72px)'
        justifyContent='center'
        direction='column'
        alignItems='center'
        textAlign='center'
      >
        <Heading fontSize='6xl' color='text' my={4}>
          Neverin
        </Heading>
        <Text fontSize='3xl' color='text' my={4}>
          Final thesis on the subject of QR ordering in the service industry.
        </Text>
        <Text fontSize='xl' color='text' my={4}>
          To use the service as a guest, scan the QR codes at this address.
          (link)
        </Text>
      </Flex>
    </>
  )
}

export default HomePage
