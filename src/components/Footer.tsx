import { Link,
  Flex,
  HStack,
  Image
} from "@chakra-ui/react";

function Footer() {
  return (
    <Flex py={4} alignItems="center" justifyContent="center" flexDirection="column">
        <HStack spacing={5} fontSize={{ base:"xs", md: "xs", lg:"lg" }} color="primary" mb={5}>

          {/* TODO: Add mobile responsive styling for footer */}

          <Link href="/">NTU Website</Link>
          <Link href="/">SCSE Office</Link>
          <Link href="/">Abous Us</Link>
          <Image src="/images/SCSE-Logo.png" alt="SCSE Logo" boxSize={14} />
          <Link href="/">Contact Us</Link>
          <Link href="/">Merchandise</Link>
          <Link href="/">Resources</Link>
        </HStack>
        <Image src="./images/vercellogo.svg" w={48} objectFit="contain" mb={5}/>
    </Flex>

  );
}


export default Footer;
