import { Link,
  Flex,
  HStack,
  Image
} from "@chakra-ui/react";

function Footer() {
  return (
    <Flex py={4} alignContent="center" justifyContent="center">
        <HStack spacing={5} fontSize={{ base:"xs", md: "xs", lg:"lg" }} color="primary">
          <Link href="/">NTU Website</Link>
          <Link href="/">SCSE Office</Link>
          <Link href="/">Abous Us</Link>
          <Image src="/images/SCSE-Logo.png" alt="SCSE Logo" boxSize={14} />
          <Link href="/">Contact Us</Link>
          <Link href="/">Merchandise</Link>
          <Link href="/">Resources</Link>
        </HStack>
    </Flex>
  );
}

export default Footer;
