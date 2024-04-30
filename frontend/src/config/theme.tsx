/* theme.ts */
import { buttonTheme } from "@/shared/components/ui/Button";
import { cardTheme } from "@/shared/components/ui/Card";

import { switchTheme } from "@/shared/components/ui/Switch";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	components: {
		Switch: switchTheme,
		Button: buttonTheme,
		Card: cardTheme,
	},
	fonts: {
		heading: "var(--font-rubik)",
		body: "var(--font-rubik)",
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
		light: "#F5EEE5",
		dark: "#140111",
		bgDark: "#0B0F0B",
		bgLight: "#FFFFFF",
		accent: "#E66300",
		babyGreen: "#B2E6C7",
		footerBgLight: "#F2F2F2",
		footerBgDark: "#0C0C0B",
	},
	styles: {
		global: (props: any) => ({
			"html, body": {
				color: props.colorMode === "dark" ? "light" : "dark",
				bg: props.colorMode === "dark" ? "bgDark" : "BgLight",
			},
		}),
	},
});
