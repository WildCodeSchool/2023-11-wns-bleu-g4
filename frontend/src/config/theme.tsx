/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
        heading: 'var(--font-rubik)',
        body: 'var(--font-rubik)',
    },
    globalTheme: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    colors: {
        cactus: {
            50: "#E1E7E1",
            100: "#CAD6CC",
            200: "#D0DAD4",
            300: "#91B195",
            400: "#4F6F52",
            500: "#194D2E",
            600: "#324335",
            700: "#2C3B32",
            800: "#2a3b2c",
            900: "#233125",
            950: "#0B0F0B",
        },
        light: "#F5EEE5",
        dark: "#140111"
    },
    styles: {
        global: (props: any) => ({
            'html, body': {
                color: props.colorMode === 'dark' ? 'light' : 'dark',
                bg: props.colorMode === 'dark' ? 'cactus-900' : 'white',
            },
        }),
    },
});