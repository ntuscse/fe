import React from "react";
import { Box, Flex, Heading, Text, Divider, Image, Icon, Link } from "@chakra-ui/react";

import { AiOutlineCreditCard } from "react-icons/ai";
import PaymentCard from "./PaymentCard";
import PayLahForm from "./PayLahForm";
import CardPaymentForm from "./CardPaymentForm";
import { useCartStore } from "../../context/cart";
import { calCartSubTotal, calDiscountAmt } from "../../utils/functions/price";

enum PaymentTypes {
  card,
  paylah,
}

export const Checkout = () => {
  // Cart Context Hook.
  const cartContext = useCartStore();
  const { state } = cartContext;
  // Calculate subtotal & discount amount.
  const subTotal = calCartSubTotal(state.items, {});
  const discountAmt = calDiscountAmt(subTotal, state.voucherDetails);

  // Payment Type.
  const [paymentType, setPaymentType] = React.useState<PaymentTypes>(PaymentTypes.card);

  const renderPaymentForm = () => {
    switch (paymentType) {
      case PaymentTypes.paylah:
        return <PayLahForm />;
      default:
        return <CardPaymentForm />;
    }
  };

  return (
    <Box p={{ base: 8, lg: 12 }} maxWidth="1400px" mx="auto">
      <Heading textAlign="center" mb="12" size="xl">
        Check Out
      </Heading>
      <Divider />
      <Flex gap={8} mt={12} flexDir={{ base: "column-reverse", md: "row" }}>
        <Flex flex={2} p={6} borderWidth="1px" borderRadius="lg" overflow="hidden" flexDir="column">
          <Flex gap={4} flexWrap="wrap">
            <PaymentCard
              onClick={() => setPaymentType(PaymentTypes.card)}
              isFocused={paymentType === PaymentTypes.card}
            >
              <Icon as={AiOutlineCreditCard} h={6} w={6} />
              <Text mt={1}>Card</Text>
            </PaymentCard>
            <PaymentCard
              onClick={() => setPaymentType(PaymentTypes.paylah)}
              isFocused={paymentType === PaymentTypes.paylah}
            >
              <Image
                height={6}
                width={6}
                src="https://play-lh.googleusercontent.com/jN6klarG9Q65oa0nHE-roczIUaIJlB3jlb5jAb1z75R7ycB-sFDkzNrt5-p3mIU_6A"
              />
              <Text mt={1}>Paylah</Text>
            </PaymentCard>
          </Flex>
          {renderPaymentForm()}
        </Flex>
        <Flex flex={1} direction="column" gap={4}>
          <Flex p={3} gap={4} flexDir="column" borderWidth="1px" borderRadius="lg">
            <Flex justifyContent="space-between">
              <Text>Order Summary | {state.items.length} item(s)</Text>
              <Link cursor="pointer" href="/cart">
                <Text as="u">Edit</Text>
              </Link>
            </Flex>
            <Divider />
            <Flex justifyContent="space-between">
              <Text>Item(s) subtotal</Text>
              <Text>${subTotal.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Voucher Discount</Text>
              <Text>-${discountAmt.toFixed(2)}</Text>
            </Flex>
            <Divider />
            <Flex justifyContent="space-between">
              <Text>Total Amount</Text>
              <Text>$ {(subTotal - discountAmt).toFixed(2)}</Text>
            </Flex>
          </Flex>
          <Flex p={3} gap={4} flexDir="column" borderWidth="1px" borderRadius="lg">
            <Flex gap={4} flexDir="column">
              <Text>Collection Details</Text>
              <Divider />
              <Text>
                An email will be sent to you closer to the collection date. Our collection venue is at 50 Nanyang Ave,
                #32 Block N4 #02a, Singapore 639798
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
