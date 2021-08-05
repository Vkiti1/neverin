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
    if (user) {
      router.push(`/shop/${user.uid}`)
    }
  }, [user])

  return (
    <>
      <Header />
      <Flex
        justifyContent='center'
        direction='column'
        alignItems='center'
        m='auto'
        transform='translate(0, 100%)'
      >
        <Heading fontSize='4xl' color='text'>
          Neverin
        </Heading>
        <Text fontSize='xl' color='text'>
          Final thesis on the subject of QR ordering in the service industry.
        </Text>
        <Text>
          To use the service as a guest, scan the QR codes at this address.
          (link)
        </Text>
      </Flex>
    </>
  )
}

export default HomePage
