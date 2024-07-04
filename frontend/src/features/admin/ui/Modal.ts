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

const neutralOverlayStyle = defineStyle({
  overlay: {
    bg: "blackAlpha.500",
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
    neutralOverlayStyle,
    darkOverlayStyle,
  },
});
