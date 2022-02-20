import { Link, Flex, Heading, Button, HStack } from "@chakra-ui/react";

function Header() {
  return (
    <Flex
      px="50px"
      py="20px"
      width="full"
      bg="white.900"
      justifyContent="space-between"
    >
      <Flex>
        <Heading mr="60px" fontSize="2xl" color="#181c62">
          SCSE CLUB
        </Heading>
      </Flex>
      <Flex alignItems="flex-end">
        <HStack spacing="20px">
          <Link href="/">Home</Link>
          <Link href="/">Projects</Link>
          <Link href="/">Abous Us</Link>
          <Link href="/">Merchandise</Link>
          <Button w="130px" colorScheme="red" variant="outline">
            Sign in
          </Button>
          <Button w="155px" colorScheme="red" variant="solid">
            Create an Account
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Header;
