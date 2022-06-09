import { Flex } from "@chakra-ui/react";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <Flex direction="column" minHeight="100vh" justifyContent="space-between">
      <SignUpForm />
    </Flex>
  );
};

export default SignUp;
