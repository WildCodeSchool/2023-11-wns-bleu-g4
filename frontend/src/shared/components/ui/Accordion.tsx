import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
  container: defineStyle({
    boxShadow: "sm",
    _focus: {
      boxShadow: "outline",
    },
  }),
});

// Defining a custom variant called outline
const faq = definePartsStyle(props => {
  const { colorScheme: c } = props;
  return {
    container: {
      backgroundColor: "#F5F5F5",
      borderRadius: "8px",
      padding: "1rem",
      _dark: {
        backgroundColor: "#1D231E",
      },
    },
    button: {
      height: "95px",
      fontFamily: "Poppins",
      fontSize: { base: "16px", md: "21px" },
      fontWeight: "400",
      _hover: {
        backgroundColor: "#F5F5F5",
      },
      _dark: {
        backgroundColor: "#1D231E",
      },
    },
    panel: {
      fontSize: "16px",
      fontWeight: "400",
    },
  };
});

const variants = {
  faq,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};

export const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
    variant: "faq",
  },
});
