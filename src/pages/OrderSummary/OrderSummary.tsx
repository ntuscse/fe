import { FC, useState } from "react";
import { Button, Flex, Heading, Text, useBreakpointValue, Divider, Image, Badge } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../components/OrderItem";
import { renderOrderStatus } from "../../utils/constants/order-status";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import { OrderStatusType, OrderType } from "../../typings/order";
import Error404 from "../Error404";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";
import LoadingScreen from "../../components/LoadingScreen";

type OrderHistoryType = Record<string, boolean>;

export const OrderSummary: FC = () => {
  // Check if break point hit.
  const isMobile: boolean = useBreakpointValue({ base: true, md: false }) || false;
  const { slug: orderSlug = "" } = useParams();
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [orderState, setOrderState] = useState<OrderType | null>(null);
  // Fetch and check if cart item is valid.
  const { isLoading } = useQuery([QueryKeys.ORDER, orderSlug], () => api.getOrder("jacob", orderSlug), {
    onSuccess: (data: OrderType) => {
      setOrderState(data);
      // Check if first time visiting -> means came from checkout -> show thank you message.
      const orderHistory: OrderHistoryType = JSON.parse(localStorage.getItem("order-history") as string) ?? {};
      if (!(data?.orderId in orderHistory)) {
        setShowThankYou(true);
      }
      orderHistory[data?.orderId] = true;
      localStorage.setItem("order-history", JSON.stringify(orderHistory));
    },
  });

  const renderThankYouMessage = () => (
    <>
      <Heading size="xl">THANK YOU</Heading>
      <Text>Thank you for your purchase. We have received your order.</Text>
      <Link to={routes.HOME}>
        <Button borderRadius={0} size="sm">
          CONTINUE SHOPPING
        </Button>
      </Link>
      <Divider my={8} />
    </>
  );

  const renderOrderSummary = () => (
    <>
      <Flex flexDirection="column" alignItems="center" rowGap={3}>
        {showThankYou && renderThankYouMessage()}
      </Flex>

      <Flex p={6} borderWidth="1px" borderRadius="lg" overflow="hidden" flexDir="column">
        <Flex justifyContent="space-between">
          <Flex flexDir="column">
            <Flex alignItems="center" gap={4}>
              <Heading size="md">Order Number</Heading>
              <Badge width="fit-content">{renderOrderStatus(orderState?.status ?? OrderStatusType.DELAY)}</Badge>
            </Flex>
            <Heading size="lg" mt={2}>
              {orderState?.orderId}
            </Heading>
          </Flex>
          <Flex flexDir="column" fontSize="sm" color="grey">
            <Text>Order data: {orderState?.orderDate}</Text>
            <Text>Last update: {orderState?.lastUpdate}</Text>
          </Flex>
        </Flex>
        <Divider my={4} />
        {orderState?.items.map((item) => (
          <OrderItem data={item} isMobile={isMobile} />
        ))}

        <Flex alignItems="end" flexDirection="row" gap={1} mt={4}>
          <Flex flexDir="column" flex={1} textAlign="end" fontWeight={500}>
            <Text>Item Subtotal:</Text>
            <Text>Voucher Discount:</Text>
            <Text>Total:</Text>
          </Flex>
          <Flex flexDir="column" textAlign="end">
            <Text fontSize="md"> ${orderState?.billing?.subtotal?.toFixed(2)}</Text>
            <Text fontSize="md">
              {`$${((orderState?.billing?.subtotal ?? 0) - (orderState?.billing?.total ?? 0)).toFixed(2)}`}
            </Text>
            <Text fontSize="md">${orderState?.billing.total?.toFixed(2)}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex mt={6} alignItems="center" py={3} borderRadius="lg" borderWidth="1px" flexDirection="column" rowGap={4}>
        {/* TODO: QR Code generator based on Param. */}
        <Image
          maxWidth={40}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
        />
        <Text fontWeight="bold">Please bring this qrcode to the SCSE Lounge to collect your order.</Text>
        <Text>For any assistance please contact our email address: merch@scse.com</Text>
      </Flex>
    </>
  );

  const renderSummaryPage = () => {
    if (isLoading) return <LoadingScreen text="Fetching order detail" />;
    if (orderState === null || orderState === undefined) return <Error404 />;
    return renderOrderSummary();
  };
  return <Page>{renderSummaryPage()}</Page>;
};
