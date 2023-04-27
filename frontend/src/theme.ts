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
    MuiDialog:{
      styleOverrides: {
        root: {
          backdropFilter: 'blur(4px)'
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontFamily: 'Lato, sans-serif',
          textTransform: 'none',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato, sans-serif',
          textTransform: 'none',
          fontWeight: "bold"
        },
      },
    },
  },
})

export default theme
