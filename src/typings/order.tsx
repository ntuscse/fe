// eslint-disable-next-line no-shadow
export enum OrderStatusType {
  PENDING_PAYMENT = 1,
  PAYMENT_COMPLETED,
  ORDER_COMPLETED,
}

export type OrderItemType = {
  id: string;
  image: string;
  size: string;
  colorway: string;
  price: number;
  quantity: number;
  name: string;
};

export type OrderBillingType = {
  total: number;
  subtotal: number;
  appliedVoucher?: null;
};

export type OrderType = {
  userId: string;
  orderID: string;
  orderItems: OrderItemType[];
  status: OrderStatusType;
  billing: OrderBillingType;
  orderDateTime: string | Date;
  lastUpdate: string | Date | undefined;
};
