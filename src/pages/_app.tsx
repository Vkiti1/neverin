import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { FirebaseProvider } from 'context/firebase-instance'
import { AuthProvider } from 'context/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <FirebaseProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </FirebaseProvider>
    </ChakraProvider>
  )
}

export default MyApp
