import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import chakraTheme from "./components/theme";

const App = () => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
