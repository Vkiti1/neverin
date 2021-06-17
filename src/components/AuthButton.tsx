import { Button } from '@chakra-ui/button'
import { useAuth } from 'context/auth'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface Props {
  email?: string
  password?: string
  variant?: string
}

export const AuthButton: FC<Props> = ({ email, password, variant }) => {
  const { login, logout, user } = useAuth()
  const router = useRouter()

  const handler = async () => {
    if (user) {
      await logout()
      router.push('/')
    } else {
      const user = await login(email, password)
      router.push(`/shop/${user.uid}`)
    }
  }

  return (
    <Button variant={variant} onClick={handler}>
      {user ? 'Sign out' : 'Sign in'}
    </Button>
  )
}
