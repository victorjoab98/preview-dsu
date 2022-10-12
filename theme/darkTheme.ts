import { createTheme } from '@mui/material';


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
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
    }
})