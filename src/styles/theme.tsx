import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { body: `'Roboto', sans-serif`, heading: `'Roboto', sans-serif` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    white: '#f5f5f5',
    background: '#9c9c9c',
    accent: '#4f4f4f',
    text: '#242424',
  },
  fonts,
  breakpoints,
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'white',
        minHeight: '100vh',
      },
    },
  },
})

export default theme
