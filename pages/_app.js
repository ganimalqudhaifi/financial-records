import { StrictMode } from 'react';
import { AppProvider, AuthContextProvider, GlobalProvider } from '../context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <GlobalProvider>
        <AppProvider>
          <AuthContextProvider>
            <StrictMode>
              <Component {...pageProps} />
            </StrictMode>
          </AuthContextProvider>
        </AppProvider>
      </GlobalProvider>
    </>
  );
}

export default MyApp;
