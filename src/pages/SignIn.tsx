import { Flex } from '@chakra-ui/react';
import Header from "../components/Header";
import SignInForm from "../components/SignInForm";
import Footer from "../components/Footer";

const SignIn = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <SignInForm />
      <Footer /> 
    </Flex>
  );
};

export default SignIn;
