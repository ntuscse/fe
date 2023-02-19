import { Image, Grid, GridItem, Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type FooterLinkProps = {
  children: ReactNode;
  href: string;
};

function Footer() {
  return (
    <Flex direction="column" alignItems="center" mt={10} mb={5}>
      <Image src="https://cdn.ntuscse.com/LogoBW.png" alt="SCSE Logo" boxSize={14} />
      <Image src="/images/vercellogo.svg" w={48} objectFit="contain" my={2} />
    </Flex>
  );
}

export default Footer;
