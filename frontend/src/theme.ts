import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#004F56',
    },
    secondary: {
      main: '#00497b',
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