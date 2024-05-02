import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(cardAnatomy.keys);

const footerCard = definePartsStyle({
	// define the part you're going to style
	container: {
		height:'fit-content',
		backgroundColor: "footerBgLight",
		borderRadius: "10px",
		px: { base: "0", md: "7" },
		py: "2",
		_dark: {
			backgroundColor: "footerBgDark",
		},
	},
	header: {
		paddingBottom: "2px",
	},
	body: {
		paddingTop: "2px",
	},
	footer: {
		paddingTop: "2px",
	},
});

const loginCard = definePartsStyle({
	container: {
	  borderRadius: "1rem",
	  backgroundColor: 'cardBgLight',
	//   _dark: {
	// 	backgroundColor: 'bgDark',
	// 	border:'1px',
	// 	borderColor:'cardBgLight'
	//   }
	},
	header: {
	  fontWeight: '500',
	  fontSize: '24px',
	},
	body: {
	  color: 'dark',
	//   _dark: {
	// 	color: 'light'
	//   }
	},
	footer: {
	  color: 'light',
	//   _dark: {
	// 	color: 'light'
	//   }
	},
  })

const sizes = {
	md: definePartsStyle({
		container: {
			borderRadius: "0px",
		},
	}),
};

export const cardTheme = defineMultiStyleConfig({
	sizes,
	variants: {
		footerCard,
		loginCard
	},
});
