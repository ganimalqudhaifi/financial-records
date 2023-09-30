import { AppProvider, GlobalProvider } from '../context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <GlobalProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </GlobalProvider>
    </>
  );
}

export default MyApp;
