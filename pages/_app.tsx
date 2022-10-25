import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@mui/material';

import { store } from '../store';

import '../styles/globals.css';
import { PageProvider } from '../components/ui/';
import { useAppDispatch } from '../store/hooks';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <Provider store = { store } >
        <PageProvider>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </PageProvider>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
