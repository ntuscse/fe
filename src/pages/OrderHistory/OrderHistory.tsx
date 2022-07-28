import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, useBreakpointValue, Divider, Link, Skeleton, Stack } from "@chakra-ui/react";

import { OrderHistoryType, OrderItemType, OrderType } from "../../typings/order";
import { renderOrderStatus, getOrderStatusColor } from "../../utils/constants/order-status";
import OrderItem from "../../components/OrderItem";

export const OrderHistory: React.FC = () => {
  // Check if break point hit.
  const isMobile: boolean = useBreakpointValue({ base: true, md: false }) || false;
  const [loading, setLoading] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<OrderHistoryType | null>(null);

  useEffect(() => {
    // TODO: async fetch to BE for Order Status based on parameter.
    const fetchOrderHistory = async () => {
      setLoading(true);
      // await fakeDelay(); // Stimulate
    };
    fetchOrderHistory()
      .then((res) => setOrderList(orderList))
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={{ base: 8, lg: 12 }} maxWidth="1400px" mx="auto">
      {!loading && (
        <Flex flexDirection="column" alignItems="center" rowGap={3}>
          <Heading size="xl">MY PURCHASE</Heading>
        </Flex>
      )}
      <Divider my={8} />

      {loading ? (
        <Stack gap={5} mt={6}>
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </Stack>
      ) : (
        orderList?.orders.map((order: OrderType) => {
          const orderItems = order?.items || [];
          const { orderId, orderDate, lastUpdate } = order ?? {};
          const orderHeader = (
            <Flex justifyContent="space-between" fontSize={{ base: "xs", md: "sm" }}>
              <Flex gap="5px" flexDirection={{ base: "column", md: "row" }}>
                <Text>Order ID: {orderId}</Text>
                {!isMobile && <Text>|</Text>}
                <Text>Order Date: {orderDate}</Text>
                {!isMobile && <Text>|</Text>}
                <Text>Last Update: {lastUpdate}</Text>
              </Flex>
              <Box color={getOrderStatusColor(order?.status)}>{renderOrderStatus(order?.status)}</Box>
            </Flex>
          );
          return (
            <Flex flexDirection="column" mt={5}>
              <Flex p={5} borderWidth="1px" borderRadius="lg" overflow="hidden" flexDir="column">
                {orderHeader}
                <Divider mt={4} />
                {orderItems.map((item: OrderItemType) => {
                  return <OrderItem data={item} isMobile={isMobile} />;
                })}
                <Flex mt={4} gap="8px" alignItems="flex-end" flexDirection="column" fontSize={{ base: "xs", md: "sm" }}>
                  <Box display="flex" gap="4px">
                    <Text fontWeight={500}>Order Total:</Text>
                    {`$${order?.billing?.total?.toFixed(2)}`}
                  </Box>
                  <Link href="google.com">
                    <Text fontWeight={500}>View more detail </Text>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          );
        })
      )}
    </Box>
  );
};
