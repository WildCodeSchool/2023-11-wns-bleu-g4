import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {},
  thumb: {
    bg: "accent",
  },
  track: {
    bg: "gray.100",
    border: "2px solid #E66300",
    _checked: {
      bg: "gray.100",
      _dark: {
        bg: { base: "gray.100", md: "gray.800" },
      },
    },
  },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
