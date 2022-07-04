import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  Divider,
  Image,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import OrderItem from "../../components/OrderItem";
import { orderSummary } from "../../data/mock/orderstatus";
import { fakeDelay } from "../../utils/functions/random";
import { renderOrderStatus } from "../../utils/constants/order-status";

export const OrderSummary = () => {
  // Check if break point hit.
  const isMobile: boolean =
    useBreakpointValue({ base: true, md: false }) || false;
  const [loading, setLoading] = useState<boolean>(false);
  const { orderNo, status, items, billing, orderDate, lastUpdate } =
    orderSummary;

  React.useEffect(() => {
    // TODO: async fetch to BE for Order Status based on parameter.
    const fetchOrderSummary = async () => {
      setLoading(true);
      await fakeDelay(); // Stimulate
      setLoading(false);
    };
    fetchOrderSummary().catch((e) => console.log(e));
  }, []);

  return (
    <Box p={{ base: 8, lg: 12 }} maxWidth="1400px" mx="auto">
      {!loading && (
        <Flex flexDirection="column" alignItems="center" rowGap={3}>
          <Heading size="xl">THANK YOU</Heading>
          <Text>Thank you for your purchase. We have received your order.</Text>
          <Button borderRadius={0} size="sm">
            CONTINUE SHOPPING
          </Button>
        </Flex>
      )}
      <Divider my={8} />
      <Flex
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        flexDir="column"
      >
        <Heading size="md">Order Number</Heading>
        {loading ? (
          <Skeleton height="8" mt={2} />
        ) : (
          <Heading size="lg" mt={2}>
            {orderNo}
          </Heading>
        )}
        <Divider mt={2} mb={6} />
        <Heading size="md">Order Summary</Heading>
        {loading ? (
          <Stack gap={5} mt={6}>
            <Skeleton height="100px" />
            <Skeleton height="100px" />
            <Skeleton height="100px" />
          </Stack>
        ) : (
          <>
            {items.map((item) => (
              <OrderItem data={item} isMobile={isMobile} />
            ))}
          </>
        )}
        <Flex alignItems="end" flexDirection="column" rowGap={2}>
          <Divider mb="4" />
          {loading ? (
            <Skeleton height="75px" width="200px" />
          ) : (
            <>
              <Text fontSize="md">Item Subtotal: ${billing.subtotal}</Text>
              <Text fontSize="md">Voucher Discount: ${billing.subtotal}</Text>
              <Text fontSize="md">Total Amount: ${billing.total}</Text>
              <Divider my="4" />
              <Text fontSize="md">Order Date: {orderDate}</Text>
              <Text fontSize="md">Last Update Discount: {lastUpdate}</Text>
              <Text fontSize="md">
                Order Status: {renderOrderStatus(status)}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
      {!loading && (
        <Flex
          mt={6}
          alignItems="center"
          py={3}
          borderRadius="lg"
          borderWidth="1px"
          flexDirection="column"
          rowGap={4}
        >
          {/* TODO: QR Code generator based on Param. */}
          <Image
            maxWidth={40}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
          />
          <Text fontWeight="bold">
            Please bring this qrcode to the SCSE Lounge to collect your order.
          </Text>
          <Text>
            For any assistance please contact our email address: merch@scse.com
          </Text>
        </Flex>
      )}
    </Box>
  );
};
