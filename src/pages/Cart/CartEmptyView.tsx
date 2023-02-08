import React from "react";
import { Link } from "react-router-dom";
import { Center, Flex, Heading, Button } from "@chakra-ui/react";
import routes from "../../utils/constants/routes";

const CartEmptyView: React.FC = () => (
  <Center minH="50vh" width="100%">
    <Flex flexDirection="column" gap={8} alignItems="center">
      <Heading fontSize="2xl">No items in your cart</Heading>
      <Link to={routes.HOME}>
        <Button size="md" flexShrink={1} borderRadius={0}>
          CONTINUE SHOPPING
        </Button>
      </Link>
    </Flex>
  </Center>
);

export default CartEmptyView;
