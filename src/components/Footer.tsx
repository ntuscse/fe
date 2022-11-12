import { Image, Grid, GridItem, Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type FooterLinkProps = {
  children: ReactNode;
  href: string;
};

function Footer() {
  return (
    <Flex direction="column" alignItems="center">
      <Box>
        <Grid
          display="inline-grid"
          gap={5}
          alignItems="center"
          justifyContent="center"
          my={5}
          flexDirection="row"
          /*
          templateColumns={{
            base: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr) 64px repeat(3, 1fr)",
          }} 
          */
        >
          <GridItem
            colStart={{ base: 1, lg: "auto" }}
            colEnd={{ base: 4, lg: "auto" }}
            order={{ base: "-1", lg: "initial" }}
            justifySelf="center"
          >
            <Image src="/images/SCSE-Logo.png" alt="SCSE Logo" boxSize={14} />
          </GridItem>
        </Grid>
      </Box>
      <Image src="/images/vercellogo.svg" w={48} objectFit="contain" my={5} />
    </Flex>
  );
}

export default Footer;
