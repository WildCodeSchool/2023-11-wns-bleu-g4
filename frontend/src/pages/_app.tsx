import { theme } from "@/config/theme";
import { BookingDataContextProvider } from "@/context/BookingDataContext";
import { ProductProvider } from "@/context/ProductPageContext";
import client from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/UserDataContext";
import "@/styles/globals.css";
import "@/styles/toast.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GearGo - Rent Outdoor Gear for Your Adventures",
  description:
    "GearGo is your go-to platform for renting outdoor equipment, from camping gear to hiking accessories. Enjoy your " +
    "outdoor adventures without the hassle of ownership.",
  keywords: "GearGo, gear rental, outdoor equipment, camping gear, hiking gear, outdoor adventures, rental platform",
  robots: "index, follow",
  authors: [
    { name: "Alexandre Chambrin" },
    { name: "Mehdy Hertereau" },
    { name: "Jeremy Dohin" },
    { name: "Loic Hernandez" },
  ],
  openGraph: {
    title: "GearGo - Rent Outdoor Gear for Your Adventures",
    description:
      "GearGo is your go-to platform for renting outdoor equipment, from camping gear to hiking accessories. " +
      "Enjoy your outdoor adventures without the hassle of ownership.",
    url: "https://www.geargo.com",
    siteName: "GearGo",
    type: "website",
  },
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <BookingDataContextProvider>
            <ProductProvider>
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <Component {...pageProps} suppressHydrationWarning />
              <ToastContainer theme={"colored"} position="bottom-right" stacked />
            </ProductProvider>
          </BookingDataContextProvider>
        </UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(appWithTranslation(App)), { ssr: false });
