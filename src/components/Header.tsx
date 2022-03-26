import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Link,
  Flex,
  Heading,
  Button,
  HStack,
  Spacer,
  Image,
  Show,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Grid,
  Hide,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import CognitoClient from "../utils/aws/cognito/cognitoClient";

const HeaderDrawer = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        aria-label="Toggle Header Menu"
        icon={<HamburgerIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />

          <DrawerBody pt={8}>
            <Grid rowGap={4}>
              <Heading size="lg">Home</Heading>
              <Heading size="lg">Projects</Heading>
              <Heading size="lg">About Us</Heading>
              <Heading size="lg">Merchandise</Heading>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    CognitoClient.isUserSignedIn().then((isSignedIn) => {
      setIsAuthenticated(isSignedIn)
    });
  }, []);
  
  return (
    <Flex py={4} px={{ base: 4, md: 4, lg: 16 }} align="center">
      <HStack spacing={2}>
        <Image src="/images/SCSE-Logo.png" alt="SCSE Logo" boxSize={14} />
        <Heading>SCSE CLUB</Heading>
      </HStack>

      <Spacer />
      <Show below="xl">
        <HeaderDrawer />
      </Show>
      <Hide below="xl">
        <HStack spacing={5}>
          <Link href="/" fontWeight="700">
            Home
          </Link>
          <Link href="/">Projects</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Merchandise</Link>
          {!isAuthenticated && (<><Button to="/sign-in" as={RouterLink} variant="outline" px={12}>
            Sign in
          </Button><Button to="/sign-up" as={RouterLink} variant="solid">
              Create an Account
            </Button></>)}
        </HStack>
      </Hide>
    </Flex>
  );
};

export default Header;
