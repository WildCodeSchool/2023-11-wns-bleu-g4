import {theme} from "@/config/theme";
import {BookingDataContextProvider} from "@/context/BookingDataContext";
import {ProductProvider} from "@/context/ProductPageContext";
import client from "@/graphql/client";
import "@/styles/globals.css";
import {ApolloProvider} from "@apollo/client";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import {appWithTranslation} from "next-i18next";
import type {AppProps} from "next/app";
import dynamic from "next/dynamic";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {UserProvider} from "@/context/UserDataContext";

function App({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <BookingDataContextProvider>
            <ProductProvider>
              <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
              <Component {...pageProps} suppressHydrationWarning/>
              <ToastContainer theme={"colored"} position="bottom-right" stacked/>
            </ProductProvider>
          </BookingDataContextProvider>
        </UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(appWithTranslation(App)), {ssr: false});
