import {
  Link,
  Flex,
  Heading,
  Button,
  HStack,
  Spacer,
  Image,
} from "@chakra-ui/react";

function Header() {
  return (
    <Flex py={4} px={16}>
      <HStack spacing={2}>
        <Image src="/images/SCSE-Logo.png" alt="SCSE Logo" boxSize={14} />
        <Heading>SCSE CLUB</Heading>
      </HStack>

      <Spacer />

      <HStack spacing={5}>
        <Link href="/" fontWeight="700">
          Home
        </Link>
        <Link href="/">Projects</Link>
        <Link href="/">Abous Us</Link>
        <Link href="/">Merchandise</Link>
        <Button variant="outline" px={12}>
          Sign in
        </Button>
        <Button variant="solid">Create an Account</Button>
      </HStack>
    </Flex>
  );
}

export default Header;
