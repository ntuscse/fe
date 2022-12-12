import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Badge,
  Flex,
  Heading,
  HStack,
  Spacer,
  Image,
  Show,
  Hide,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import CognitoClient from "../utils/aws/cognito/cognitoClient";
import routes from "../utils/constants/routes";
import { useCartStore } from "../context/cart";
import { CartItemType } from "../typings/cart";


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
    <Flex pos="sticky" zIndex={2} bg="#dedee0" top={0} py={4} px={{ base: 4, md: 4, lg: 16 }} align="center">
      <HStack spacing={2}>
        <RouterLink to={routes.HOME}>
          <Flex alignItems="center">
            <Image src="/images/SCSE-Logo.png" alt="SCSE Logo" boxSize={14} />
            <Heading ml={1}>SCSE MERCH</Heading>
          </Flex>
        </RouterLink>
      </HStack>

      <Spacer />
      <Show below="xl">
        <RouterLink to={routes.CART}>
          <Flex alignItems="center" gap={1} mr={4}>
            <Icon as={AiOutlineShoppingCart} w={5} h={5} />
            {cartLength > 0 && <Badge>{cartLength > 99 ? "99+" : cartLength}</Badge>}
          </Flex>
        </RouterLink>
      </Show>
      <Hide below="xl">
        <HStack spacing={5} alignItems="center">
          <RouterLink to={routes.HOME}>Home</RouterLink>
          <RouterLink to={routes.CART}>
            <Flex alignItems="center" gap={1}>
              <Icon as={AiOutlineShoppingCart} w={5} h={5} />
              {cartLength > 0 && <Badge>{cartLength > 99 ? "99+" : cartLength}</Badge>}
            </Flex>
          </RouterLink>
        </HStack>
      </Hide>
    </Flex>
  );
};

export default Header;
