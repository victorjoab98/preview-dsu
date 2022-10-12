import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from '../store';
import { darkTheme, lightTheme  } from '../theme'

import '../styles/globals.css';
import { PageProvider } from '../components/ui/';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store = { store } >
      <PageProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </PageProvider>
    </Provider>
  )
}

export default MyApp
