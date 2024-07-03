import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  overlay: {
    bg: "blackAlpha.300",
  },
  dialog: {
    borderRadius: "md",
    boxShadow: "none",
  },
});

const darkOverlayStyle = defineStyle({
  overlay: {
    bg: "blackAlpha.700",
  },
});

export const modalTheme = defineStyleConfig({
  variants: {
    baseStyle,
    darkOverlayStyle,
  },
});
