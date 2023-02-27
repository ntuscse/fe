import { FC, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  Divider,
  Image,
  Badge,
  Show,
  Hide,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import OrderItem from "../../components/OrderItem";
import { renderOrderStatus, getOrderStatusColor } from "../../utils/constants/order-status";
import { QueryKeys } from "../../utils/constants/queryKeys";
import { api } from "../../services/api";
import { OrderStatusType, OrderType } from "../../typings/order";
import Error404 from "../Error404";
import Page from "../../components/Page";
import routes from "../../utils/constants/routes";
import LoadingScreen from "../../components/LoadingScreen";
import { displayPrice } from "../../utils/functions/currency";

type OrderHistoryType = Record<string, boolean>;

export const OrderSummary: FC = () => {
  // Check if break point hit.
  const isMobile: boolean =
    useBreakpointValue({ base: true, md: false }) || false;
  const { slug: orderSlug = "" } = useParams();
  const [orderState, setOrderState] = useState<OrderType | null>(null);
  // TODO: Fetch subtotal and total from server.
  const [total, setTotal] = useState(0);
  // Fetch and check if cart item is valid.
  const { isLoading } = useQuery(
    [QueryKeys.ORDER, orderSlug],
    () => api.getOrder("jacob", orderSlug),
    {
      onSuccess: (data: OrderType) => {
        console.log(data);
        setOrderState(data);
        setTotal(
          data.orderItems.reduce((acc, item) => {
            return item.price * item.quantity + acc;
          }, 0)
        );
      },
    }
  );

  const renderThankYouMessage = () => (
    <>
      <Heading size="xl">THANK YOU</Heading>
      <Text>
        Thank you for your purchase.
        {orderState?.status === OrderStatusType.PAYMENT_COMPLETED
          ? " We have received your order."
          : " Your order has been collected."}
      </Text>
      <Link to={routes.HOME}>
        <Button borderRadius={0} size="sm">
          CONTINUE SHOPPING
        </Button>
      </Link>
      <Divider my={8} />
    </>
  );

  const renderPendingMessage = () => (
    <>
      <Heading size="xl">PAYMENT PENDING</Heading>
      <Text align="center" mb={5}>
        We are currently pending confirmation for your payment If you have
        paid, please check back later. <br />
        Should the issue persist, please contact us at <a
        href="mailto:merch@ntuscse.com">merch@ntuscse.com</a> with proof of
        payment. We apologize for the inconvenience.
      </Text>
      <Link to={routes.HOME}>
        <Button borderRadius={0} size="sm">
          CONTINUE SHOPPING
        </Button>
      </Link>
      <Divider my={8} />
    </>
  );

  const renderStatusMessage = () => {
    if (!orderState) return null;
    switch (orderState?.status) {
      case OrderStatusType.PAYMENT_COMPLETED:
      case OrderStatusType.ORDER_COMPLETED:
        return renderThankYouMessage();
      case OrderStatusType.PENDING_PAYMENT:
        return renderPendingMessage();
      default:
        return null;
    }
  };

  const renderCollectionQR = () =>
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
          src={
            orderState
              ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dev.merch.ntuscse.com/order-summary/${orderState?.orderID}`
              : ""
          }
        />
        <Text fontWeight="bold">
          Please screenshot this QR code and show it at SCSE Lounge to collect
          your order. Alternatively, show the email receipt you have received.
        </Text>
        <Text>
          For any assistance, please contact our email address:
          merch@ntuscse.com
        </Text>
      </Flex>

  const renderOrderSummary = () => (
    <>
      <Flex flexDirection="column" alignItems="center" rowGap={3}>
        {orderState && renderStatusMessage()}
      </Flex>

      <Flex
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        flexDir="column"
      >
        <Show below="md">
          <Flex justifyContent="space-between">
            <Flex flexDir="column" w="100%">
              <Badge
                width="fit-content"
                fontSize="sm"
                mb={2}
                color={getOrderStatusColor(orderState?.status ?? OrderStatusType.PENDING_PAYMENT)}
              >
                {renderOrderStatus(orderState?.status ?? OrderStatusType.PENDING_PAYMENT)}
              </Badge>
              <Heading size="md">Order Number</Heading>
              <Heading size="lg">
                {orderState?.orderID.split("-")[0]}
              </Heading>
              <Flex alignItems="center" mb={2}>
                <Text fontSize="sm">{orderState?.orderID}</Text>
              </Flex>
              <Text fontSize="sm" color="grey">
                Order date:{" "}
                {orderState
                  ? new Date(`${orderState.orderDateTime}Z`).toLocaleString(
                      "en-sg"
                    )
                  : ""}
              </Text>
              <Text fontSize="sm" color="grey">
                Last update: {orderState?.lastUpdate}
              </Text>
            </Flex>
          </Flex>
        </Show>
        <Hide below="md">
          <Flex justifyContent="space-between">
            <Flex flexDir="column">
              <Flex alignItems="center" gap={6}>
                <Heading size="md">Order Number</Heading>
                <Badge
                  width="fit-content"
                  fontSize="sm"
                  color={getOrderStatusColor(orderState?.status ?? OrderStatusType.PENDING_PAYMENT)}
                >
                  {renderOrderStatus(orderState?.status ?? OrderStatusType.PENDING_PAYMENT)}
                </Badge>
              </Flex>
              <Heading size="lg" mb={2}>
                {orderState?.orderID.split("-")[0]}
              </Heading>
              <Flex alignItems="center">
                <Text fontSize="sm">{orderState?.orderID}</Text>
              </Flex>
            </Flex>
            <Flex flexDir="column" fontSize="sm" color="grey">
              <Text>
                Order date:{" "}
                {orderState
                  ? new Date(`${orderState.orderDateTime}Z`).toLocaleString(
                      "en-sg"
                    )
                  : ""}
              </Text>
              <Text>Last update: {orderState?.lastUpdate}</Text>
            </Flex>
          </Flex>
        </Hide>
        <Divider my={4} />
        {orderState?.orderItems.map((item) => (
          <OrderItem data={item} isMobile={isMobile} />
        ))}

        <Flex alignItems="end" flexDirection="row" gap={1} mt={4}>
          <Flex flexDir="column" flex={1} textAlign="end" fontWeight={500}>
            <Text>Item Subtotal:</Text>
            <Text>Voucher Discount:</Text>
            <Text>Total:</Text>
          </Flex>
          <Flex flexDir="column" textAlign="end">
            <Text fontSize="md"> {displayPrice(total)}</Text>
            <Text fontSize="md">
              {displayPrice(
                (orderState?.billing?.subtotal ?? 0) -
                  (orderState?.billing?.total ?? 0)
              )}
            </Text>
            <Text fontSize="md">{displayPrice(total)}</Text>
          </Flex>
        </Flex>
      </Flex>

      {orderState?.status === OrderStatusType.PAYMENT_COMPLETED && renderCollectionQR()}
    </>
  );

  const renderSummaryPage = () => {
    if (isLoading) return <LoadingScreen text="Fetching order detail" />;
    if (orderState === null || orderState === undefined) return <Error404 />;
    return renderOrderSummary();
  };
  return <Page>{renderSummaryPage()}</Page>;
};
