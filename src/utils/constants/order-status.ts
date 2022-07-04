import { OrderStatusType } from "../../typings/order";

export const renderOrderStatus = (status: OrderStatusType) => {
  switch (status) {
    case OrderStatusType.COLLECTED:
      return "Order Collected";
    case OrderStatusType.PROCESSING:
      return "Processing";
    case OrderStatusType.RECEIVED:
      return "Order Received";
    default:
      return "Item Delayed";
  }
};

export const getOrderStatusColor = (status: OrderStatusType) => {
  switch (status) {
    case OrderStatusType.COLLECTED:
      return "green.500";
    case OrderStatusType.PROCESSING:
      return "primary.400";
    case OrderStatusType.RECEIVED:
      return "primary.600";
    default:
      return "red.500";
  }
};
