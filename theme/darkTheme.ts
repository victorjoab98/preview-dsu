import { createTheme } from '@mui/material';


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#fff'
        }
    },
    components: {
      MuiTypography: {
          styleOverrides: {
            h1: {
              fontSize: 30,
              fontWeight: 600
            },
            h2: {
              fontSize: 20,
              fontWeight: 400
            },
            subtitle1: {
              fontSize: 18,
              fontWeight: 600
            }
          }
        },
        MuiLink: {
          defaultProps: {
            underline: 'none'
          }
        },
    }
})