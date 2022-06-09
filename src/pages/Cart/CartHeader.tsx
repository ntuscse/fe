import { Flex, Grid, Heading } from "@chakra-ui/react";

const CartHeader = () => {
  return (
    <Flex my="4">
      <Heading size="sm" width="100px">
        Product
      </Heading>
      <Grid templateColumns="3fr repeat(3, 1fr)" flex={1}>
        {["", "Unit Price", "Quantity", "Subtotal"].map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Heading textAlign="center" size="sm" key={index}>
            {item}
          </Heading>
        ))}
      </Grid>
      <Heading size="sm">Action</Heading>
    </Flex>
  );
};

export default CartHeader;
