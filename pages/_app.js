import GlobalProvider from '../context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default GlobalProvider(MyApp);
