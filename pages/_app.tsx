import type { AppProps } from 'next/app';


import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import '../styles/globals.css';

const basicTheme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ basicTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
