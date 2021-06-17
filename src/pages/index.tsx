import { Box } from '@chakra-ui/layout'
import { NextPage } from 'next'
import Link from 'next/link'
import { useAuth } from 'context/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
      <Box>Index</Box>
      <Link href='/login'>login</Link>
    </>
  )
}

export default HomePage
