/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-unresolved */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/lazy";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart";
import Routes from "./routes";
import chakraTheme from "./config/theme";

const App = () => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <BrowserRouter>
        <CartProvider>
          <Routes />
        </CartProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
