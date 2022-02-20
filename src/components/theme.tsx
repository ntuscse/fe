import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primary : {
            50: "D1D2E0",
            100: "#B2B3E7",
            200: "#9495BC",
            300: "#7477A1",
            400: "#7477A1",
            600: "#181C62"
        },
        secondary : {
            50: "#F7D2D9",
            100: "#F6AAB9",
            200: "#E07B8D",
            300: "#DF4D66",
            400: "#F12C4F",
            600: "#AC1A33",
            700: "#811303"
        },   
},
    styles: {
        heading: {
            
        }
    }
});

export default theme;