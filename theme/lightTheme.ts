import { createTheme } from '@mui/material';


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#1E1E1E',
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
          }
    }
})