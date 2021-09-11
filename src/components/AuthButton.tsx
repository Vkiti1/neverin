import { Button } from '@chakra-ui/button'
import { useAuth } from 'context/auth'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

interface Props {
  email?: string
  password?: string
  variant?: string
}

export const AuthButton: FC<Props> = ({ email, password, variant }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { login, logout, user } = useAuth()
  const router = useRouter()

  const handler = async () => {
    if (user) {
      setIsLoading(true)
      await logout()
      router.push('/')
    } else {
      setIsLoading(true)
      try {
        const user = await login(email, password)
        router.push(`/shop/${user.uid}`)
      } catch (err) {
        setIsLoading(false)
        console.error(err)
      }
    }
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <Button
      bg='accent'
      size='lg'
      isLoading={isLoading}
      variant={variant}
      onClick={handler}
      color='white'
      _hover={{ bg: 'white', color: 'text' }}
    >
      {user ? 'Sign out' : 'Sign in'}
    </Button>
  )
}
