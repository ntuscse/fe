import { ChakraTheme, extendTheme } from "@chakra-ui/react";

const chakraTheme: Partial<ChakraTheme> = extendTheme({
  colors: {
    primary: {
      50: "D1D2E0",
      100: "#B2B3E7",
      200: "#9495BC",
      300: "#7477A1",
      400: "#7477A1",
      600: "#181C62",
    },
    secondary: {
      50: "#F7D2D9",
      100: "#F6AAB9",
      200: "#E07B8D",
      300: "#DF4D66",
      400: "#F12C4F",
      600: "#AC1A33",
      700: "#811303",
    },
  },
  font: {
    heading: "Open Sans, sans-serif",
    body: "Montserrat, sans-serif",
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "700",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "700",
    },
  },
});

export default chakraTheme;
