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

const cartButton = defineStyle({
  color: "light", // change the text color,
  bg: "accent",
  _dark: {
    background: "accent",
    color: "white",
  },
  _hover: {
    bg: "accent",
    _dark: {
      bg: "accent",
    },
  },
});

const subNavButton = defineStyle({
  color: "black", // change the text color,
  bg: "white",
  _dark: {
    background: "black",
    color: "white",
  },
  _hover: {
    bg: "cactus.500",
    color: "white",
    _dark: {
      bg: "cactus.500",
      color: "white",
    },
  },
});

const loginButton = defineStyle({
  color: "light",
  bg: "accent",
  borderRadius: "lg",
  _hover: {
    bg: "orange.400",
  },
});

const adminFooterButton = defineStyle({
  color: "#FFF", // change the text color,
  bg: "cactus.500",
  _hover: {
    bg: "cactus.400",
  }, // change the background color darkMode
});

const sizeButton = defineStyle({
  display: "flex",
  height: "48px",
  padding: "0 15px",
  borderRadius: "10px",
  color: "dark",
  fontWeight: "600",
  bg: "#F5EEE5",
  _hover: {
    bg: "#D23732",
    color: "light",
  },
  _active: {
    bg: "#D23732",
    color: "light",
  },
});

const selectorButton = defineStyle({
  borderRadius: "50%",
  fontSize: "20px",
  fontWeight: "bold",
  color: "light",
  bg: "accent",
  _hover: {
    bg: "orange.400",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: {
    outline,
    profilButton,
    cartButton,
    subNavButton,
    loginButton,
    adminFooterButton,
    sizeButton,
    selectorButton,
  },
});
