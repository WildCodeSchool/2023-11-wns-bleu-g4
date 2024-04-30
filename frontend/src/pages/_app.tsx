import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme } from "@/config/theme";


function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<ColorModeScript initialColorMode={theme.globalTheme.initialColorMode} />
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	);
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
