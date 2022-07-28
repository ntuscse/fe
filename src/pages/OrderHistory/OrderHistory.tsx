import { FC, useState } from "react";
import { Box, Flex, Heading, Text, useBreakpointValue, Divider, Badge } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { OrderItemType, OrderType } from "../../typings/order";
import { renderOrderStatus, getOrderStatusColor } from "../../utils/constants/order-status";
import OrderItem from "../../components/OrderItem";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import Error404 from "../Error404";
import LoadingScreen from "../../components/LoadingScreen";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";
import HistoryEmptyView from "./EmptyView";

export const OrderHistory: FC = () => {
  // Check if break point hit.
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const isMobile: boolean = useBreakpointValue({ base: true, md: false }) || false;

  // Fetch and check if cart item is valid.
  const { isLoading, isRefetching } = useQuery([QueryKeys.ORDERS], () => api.getOrderHistory("jacob"), {
    onSuccess: (data: OrderType[]) => {
      console.log(orderList);
      setOrderList(data);
    },
  });

  const renderOrderHistory = () => {
    return (
      <Box p={{ base: 8, lg: 12 }} maxWidth="1400px" mx="auto">
        <Flex flexDirection="column" alignItems="center" rowGap={3}>
          <Heading size="xl">MY PURCHASE</Heading>
        </Flex>
        <Divider my={8} />
        {orderList?.map((order: OrderType) => {
          const orderItems = order?.items || [];
          const { orderId, orderDate, lastUpdate } = order ?? {};
          const orderHeader = (
            <Flex justifyContent="space-between" fontSize={{ base: "xs", md: "sm" }}>
              <Flex gap="5px" flexDirection={{ base: "column", md: "row" }} fontWeight={500}>
                <Text>Order ID: {orderId}</Text>
                {!isMobile && <Text>|</Text>}
                <Text>Order Date: {orderDate}</Text>
                {!isMobile && <Text>|</Text>}
                <Text>Last Update: {lastUpdate}</Text>
              </Flex>
              <Badge height="fit-content" color={getOrderStatusColor(order?.status)}>
                {renderOrderStatus(order?.status)}
              </Badge>
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
                  <Link to={`${routes.ORDER_SUMMARY}/${orderId}`}>
                    <Text fontWeight={500}>View detail</Text>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Box>
    );
  };

  const renderOrderHistoryPage = () => {
    if (isLoading || isRefetching) return <LoadingScreen text="Fetching your past purchase" />;
    if (orderList === null || orderList === undefined) return <Error404 />;
    if (orderList.length === 0) return <HistoryEmptyView />;
    return renderOrderHistory();
  };

  return <Page>{renderOrderHistoryPage()}</Page>;
};
