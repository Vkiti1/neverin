import { Button } from '@chakra-ui/button'
import { useAuth } from 'context/auth'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface Props {
  email?: string
  password?: string
}

export const AuthButton: FC<Props> = ({ email, password }) => {
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

  return <Button onClick={handler}>{user ? 'Sign out' : 'Sign in'}</Button>
}
