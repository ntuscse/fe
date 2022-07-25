import { Flex } from "@chakra-ui/react";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
  return (
    <Flex direction="column" minHeight="100vh" justifyContent="space-between">
      <SignInForm />
    </Flex>
  );
};

export default SignIn;
