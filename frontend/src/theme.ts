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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontFamily: 'Lato, sans-serif',
          textTransform: 'none',
          "&.Mui-focusVisible":{
            outline: '3px solid #004f56',
            outlineOffset: '2px'
          }
        }
      },
    },
    MuiButtonBase:{
      defaultProps:{
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          "&.Mui-focusVisible":{
            outline: '3px solid #004f56',
            outlineOffset: '2px'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "&:focus-within": {
            outline: '3px solid #004f56',
            outlineOffset: '2px'
          },
          "& .MuiCardActionArea-focusHighlight": {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiCheckbox:{
      styleOverrides: {
        root: {
          "&.Mui-focusVisible":{
            outlineOffset: '-5px'
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiListItemButton:{
      styleOverrides:{
        root:{
          "&:focus-within": {
            backgroundColor: 'transparent',
            outlineOffset: '-3px'
          },
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato, sans-serif',
          textTransform: 'none',
          fontWeight: 'bold',
          "&.Mui-focusVisible":{
            outlineOffset: '-3px'
          }
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato, sans-serif',
          textTransform: 'none',
        },
      },
    },
  },
})

export default theme