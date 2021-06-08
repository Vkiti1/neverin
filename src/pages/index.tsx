import { Box } from '@chakra-ui/layout'
import { NextPage } from 'next'
import Link from 'next/link'

const HomePage: NextPage = () => {
  return (
    <>
      <Box>Index</Box>
      <Link href='/login'>login</Link>
    </>
  )
}

export default HomePage
