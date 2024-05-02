import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const searchBarDrawer = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: "blackAlpha.200",
  },
  dialog: {
    bg: `white`,
    _dark: {
      bg: `#595959`,
    },
  },
});

export const drawerTheme = defineMultiStyleConfig({
  variants: {
    searchBarDrawer,
  },
});
