import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#00626b',
    },
    secondary: {
      main: '#235b8c',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontFamily: 'Lato, sans-serif',
        },
      },
    },
  },
})

export default theme
