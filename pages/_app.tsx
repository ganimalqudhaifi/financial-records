import { AppProps } from "next/app";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import AuthContextProvider from "../context/AuthContext";
import GlobalContextProvider from "../context/GlobalContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <Provider store={store}>
        <GlobalContextProvider>
          <AuthContextProvider>
            <StrictMode>
              <Component {...pageProps} />
            </StrictMode>
          </AuthContextProvider>
        </GlobalContextProvider>
      </Provider>
    </>
  );
}

export default MyApp;
