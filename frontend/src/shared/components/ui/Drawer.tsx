import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(parts.keys);

const searchBarDrawer = definePartsStyle({
	// define the part you're going to style
	overlay: {
		bg: "blackAlpha.200",
	},
	dialog: {
		bg: `white`,
		_dark: {
			bg: `bgDark`,
		},
	},
});

export const drawerTheme = defineMultiStyleConfig({
	variants: {
		searchBarDrawer,
	},
});
