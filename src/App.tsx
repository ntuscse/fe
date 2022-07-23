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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routes from "./routes";
import chakraTheme from "./config/theme";

const queryClient = new QueryClient()

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={chakraTheme}>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
  );
};

export default App;
