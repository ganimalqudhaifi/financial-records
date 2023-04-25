import { GlobalContextProvider } from '../context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
