/* theme.ts */
import {modalTheme} from "@/features/admin/ui/Modal";
import {accordionTheme} from "@/shared/components/ui/Accordion";
import {buttonTheme} from "@/shared/components/ui/Button";
import {cardTheme} from "@/shared/components/ui/Card";
import {drawerTheme} from "@/shared/components/ui/Drawer";

import {switchTheme} from "@/shared/components/ui/Switch";
import {extendTheme} from "@chakra-ui/react";
import {darken, lighten} from "polished";

export const theme = extendTheme({
  components: {
    Switch: switchTheme,
    Button: buttonTheme,
    Card: cardTheme,
    Drawer: drawerTheme,
    Modal: modalTheme,
    Accordion: accordionTheme,
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Nunito, sans-serif",
  },
  globalTheme: {
    initialColorMode: "light",
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

    // Text
    light: "#F5EEE5",
    dark: "#140111",

    // Backgrounds
    bgDark: "#0B0F0B",
    bgLight: "#FFFFFF",

    // Buttons
    accent: "#E66300",
    accentDark: darken(0.05, "#E66300"),
    accentLight: "#FF9533",

    // Common
    babyGreen: "#B2E6C7",

    // Footer
    footerBgLight: "#F2F2F2",
    footerBgDark: "#0C0C0B",

    // Cards
    cardBgLight: "#f5eee5e6",

    // Light Theme
    primary: "#194D2E",
    primaryLight: lighten(0.1, "#194D2E"),
    primaryDark: darken(0.1, "#194D2E"),
    secondary: "#4F6F52",
    secondaryLight: lighten(0.1, "#4F6F52"),
    secondaryDark: darken(0.1, "#4F6F52"),

    // Dark Theme
    primaryDarkTheme: "#B2E6C7",
    primaryDarkThemeLight: lighten(0.1, "#B2E6C7"),
    primaryDarkThemeDark: darken(0.1, "#B2E6C7"),
    secondaryDarkTheme: "#91B195",
    secondaryDarkThemeLight: lighten(0.1, "#91B195"),
    secondaryDarkThemeDark: darken(0.1, "#91B195"),

    // Table User
    tableHeaderLight: "#d0d2d6",
  },
  styles: {
    global: (props: any) => ({
      "html, body": {
        height: { base: "auto", xl: "100vh" },
        margin: 0,
        overflow: { base: "auto", xl: "hidden" },
        color: props.colorMode === "dark" ? "light" : "dark",
        bg: props.colorMode === "dark" ? "bgDark" : "bgLight",
      },
      main: {
        height: { base: "auto", xl: "calc(100vh - 64px - 32px)" },
        minHeight: { base: "auto", xl: "calc(100vh - 64px - 32px)" },
        overflowY: "auto",
      },
    }),
  },
});
