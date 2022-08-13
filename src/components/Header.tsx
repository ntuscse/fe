import { HamburgerIcon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Badge,
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
  Icon,
  Box,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import CognitoClient from "../utils/aws/cognito/cognitoClient";
import routes from "../utils/constants/routes";
import { useCartStore } from "../context/cart";
import { CartItemType } from "../typings/cart";

type HeaderDrawerProp = {
  cartLength?: number;
};

const HeaderDrawer: React.FC<HeaderDrawerProp> = ({ cartLength = 0 }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <RouterLink to={routes.CART}>
        <Flex alignItems="center" gap={1} mr={4}>
          <Icon as={AiOutlineShoppingCart} w={5} h={5} />
          {cartLength > 0 && <Badge>{cartLength > 99 ? "99+" : cartLength}</Badge>}
        </Flex>
      </RouterLink>
      <IconButton ref={btnRef} onClick={onOpen} aria-label="Toggle Header Menu" icon={<HamburgerIcon />} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />

          <DrawerBody pt={8}>
            <Grid rowGap={4}>
              <RouterLink to={routes.HOME}>
                <Heading size="lg">Home</Heading>
              </RouterLink>
              <RouterLink to={routes.MERCHANDISE_LIST}>
                <Heading size="lg">Merchandise</Heading>
              </RouterLink>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cartContext = useCartStore();
  const { state: cartState } = cartContext;
  const cartLength = cartState.items.reduce((acc: number, cur: CartItemType) => acc + cur.quantity, 0);

  useEffect(() => {
    CognitoClient.isUserSignedIn().then((isSignedIn) => {
      setIsAuthenticated(isSignedIn);
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
        <HeaderDrawer cartLength={cartLength} />
      </Show>
      <Hide below="xl">
        <HStack spacing={5} alignItems="center">
          <RouterLink to={routes.HOME}>Home</RouterLink>
          <RouterLink to={routes.MERCHANDISE_LIST}>Merchandise</RouterLink>
          <RouterLink to={routes.CART}>
            <Flex alignItems="center" gap={1}>
              <Icon as={AiOutlineShoppingCart} w={5} h={5} />
              {cartLength > 0 && <Badge>{cartLength > 99 ? "99+" : cartLength}</Badge>}
            </Flex>
          </RouterLink>
          {/* TODO: Sign Out */}
          {!isAuthenticated && (
            <>
              <Button to="/sign-in" as={RouterLink} variant="outline" px={12}>
                Sign in
              </Button>
              <Button to="/sign-up" as={RouterLink} variant="solid">
                Create an Account
              </Button>
            </>
          )}
        </HStack>
      </Hide>
    </Flex>
  );
};

export default Header;
