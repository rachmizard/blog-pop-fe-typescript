import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "710px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});

const styles = {
  global: {
    "html, body": {
      color: "gray.600",
      lineHeight: "tall",
      transition: "all 200ms ease",
    },
    a: {
      color: "teal.500",
    },
  },
};

export default extendTheme({ styles, breakpoints });
