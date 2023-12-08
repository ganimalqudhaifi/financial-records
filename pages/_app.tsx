import { AppProps } from 'next/app';
import { StrictMode } from 'react';

import AppContextProvider from '../context/AppContext';
import AuthContextProvider from '../context/AuthContext';
import GlobalContextProvider from '../context/GlobalContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <GlobalContextProvider>
        <AppContextProvider>
          <AuthContextProvider>
            <StrictMode>
              <Component {...pageProps} />
            </StrictMode>
          </AuthContextProvider>
        </AppContextProvider>
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
