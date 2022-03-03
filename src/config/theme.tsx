import { ChakraTheme, extendTheme } from "@chakra-ui/react";

const chakraTheme: Partial<ChakraTheme> = extendTheme({
  colors: {
    primary: {
      default: "#1816C2",
      50: "#D1D2E0",
      100: "#B2B3E7",
      200: "#9495BC",
      300: "#7477A1",
      400: "#7477A1",
      500: "#1816C2",
      600: "#181C62",
      700: "#0E113B",
    },
    secondary: {
      default: "#D72040",
      50: "#F7D2D9",
      100: "#F6AAB9",
      200: "#E07B8D",
      300: "#DF4D66",
      400: "#F12C4F",
      500: "#D72040",
      600: "#AC1A33",
      700: "#811303",
    },
  },
  fonts: {
    heading: "Open Sans, sans-serif",
    body: "Montserrat, sans-serif",
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "secondary",
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: ["60px", "72px"],
      fontWeight: "700",
    },
    h2: {
      fontSize: ["48px", "60px"],
      fontWeight: "700",
    },

    h3: {
      fontSize: ["36px", "48px"],
      fontWeight: "700",
    },

    h4: {
      fontSize: ["30px", "36px"],
      fontWeight: "700",
    },
    h5: {
      fontSize: ["24px", "30px"],
      fontWeight: "700",
    },
    h6: {
      fontSize: ["20px", "20px"],
      fontWeight: "700",
    },
    h7: {
      fontSize: ["16px", "16px"],
      fontWeight: "700",
    },
    h8: {
      fontsize: ["14px", "14px"],
      fontWeight: "700",
    },

    "6xl": {
      fontSize: ["60px", "30px"],
      fontWeight: "400",
    },
    "5xl": {
      fontSize: ["48px", "30px"],
      fontWeight: "400",
    },
    "4xl": {
      fontSize: ["36px", "30px"],
      fontWeight: "400",
    },
    "3xl": {
      fontSize: ["30px", "30px"],
      fontWeight: "400",
    },
    "2xl": {
      fontSize: ["24px", "30px"],
      fontWeight: "400",
    },
    xl: {
      fontSize: ["20px", "30px"],
      fontWeight: "400",
    },
    lg: {
      fontSize: ["18px", "30px"],
      fontWeight: "400",
    },
    md: {
      fontSize: ["16px", "30px"],
      fontWeight: "400",
    },
    sm: {
      fontSize: ["14px", "30px"],
      fontWeight: "400",
    },
    xs: {
      fontSize: ["12px", "30px"],
      fontWeight: "400",
    },
  },
});

export default chakraTheme;
