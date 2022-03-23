import { Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";

const SignUp = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <SignUpForm />
      <Footer /> 
    </Flex>
  );
};

export default SignUp;
