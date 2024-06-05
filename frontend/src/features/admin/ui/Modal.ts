import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  overlay: {
    bg: "blackAlpha.100",
  },
  dialog: {
    borderRadius: "md",
    boxShadow: "none",
  },
});

export const modalTheme = defineStyleConfig({
  variants: {
    baseStyle,
  },
});
