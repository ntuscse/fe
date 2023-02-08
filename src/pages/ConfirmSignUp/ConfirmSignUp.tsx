import { Flex } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ConfirmSignUpForm from "./ConfirmSignUpForm";

const ConfirmSignUp = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <ConfirmSignUpForm />
      <Footer />
    </Flex>
  );
};

export default ConfirmSignUp;
