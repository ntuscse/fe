import { OrderStatusType } from "../../typings/order";

export const renderOrderStatus = (status: OrderStatusType) => {
  switch (status) {
    case OrderStatusType.PENDING_PAYMENT:
      return "Pending Payment";
    case OrderStatusType.PAYMENT_COMPLETED:
      return "Payment Completed";
    case OrderStatusType.ORDER_COMPLETED:
      return "Order Delivered";
    default:
      return "Item Delayed";
  }
};

export const getOrderStatusColor = (status: OrderStatusType) => {
  switch (status) {
    case OrderStatusType.ORDER_COMPLETED:
      return "green.500";
    case OrderStatusType.PAYMENT_COMPLETED:
      return "primary.400";
    case OrderStatusType.PENDING_PAYMENT:
      return "primary.600";
    default:
      return "red.500";
  }
};
