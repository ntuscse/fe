import { Box, Grid, Heading } from "@chakra-ui/react";

const CartHeader = () => {
  return (
    <Box borderRadius="md" borderWidth={1} py={4}>
      <Grid templateColumns="3fr repeat(4, 1fr)">
        <Heading size="sm" ml={2}>
          Product
        </Heading>
        {["Unit Price", "Quantity", "Subtotal", "Action"].map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Heading textAlign="center" size="sm" key={index} data-testid="cart-header-2">
            {item}
          </Heading>
        ))}
      </Grid>
    </Box>
  );
};

export default CartHeader;
