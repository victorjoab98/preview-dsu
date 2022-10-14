import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@mui/material';

import { store } from '../store';

import '../styles/globals.css';
import { PageProvider } from '../components/ui/';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store = { store } >
      <PageProvider>
      <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Component {...pageProps} />
        </SnackbarProvider>
      </PageProvider>
    </Provider>
  )
}

export default MyApp
