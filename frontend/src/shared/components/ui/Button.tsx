import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
	border: "2px dashed", // change the appearance of the border
	borderRadius: 0, // remove the border radius
	fontWeight: "semibold", // change the font weight
});

const profilButton = defineStyle({
	color: "light", // change the text color,
	bg: "cactus.500",
	_dark: {
		background: "cactus.300",
		color: "dark",
	},
	_hover: {
		_dark: {
			bg: "cactus.400",
		},
	}, // change the background color darkMode
});

export const buttonTheme = defineStyleConfig({
	variants: { outline, profilButton },
});
