import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const footerCard = definePartsStyle({
  // define the part you're going to style
  container: {
    height: "fit-content",
    backgroundColor: "footerBgLight",
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
    borderRadius: "10px",
    backgroundColor: "footerBgLight",
  },
  header: {
    fontWeight: "500",
    fontSize: "24px",
  },
  body: {
    color: "dark",
  },
  footer: {
    color: "light",
  },
});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "0px",
    },
  }),
};

const productCard = definePartsStyle({
  container: {
    _light: {
      backgroundColor: "white",
    },
    _dark: {
      backgroundColor: "#2a3b2c",
      border: "none",
    },
  },
});

export const cardTheme = defineMultiStyleConfig({
  sizes,
  variants: {
    footerCard,
    loginCard,
    productCard,
  },
});
