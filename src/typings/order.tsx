// eslint-disable-next-line no-shadow
export enum OrderStatusType {
  RECEIVED,
  PROCESSING,
  READY_TO_COLLECT,
  DELAY,
  COLLECTED,
}

export type OrderItemType = {
  id: string;
  image: string;
  size: string;
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
  orderId: string;
  items: OrderItemType[];
  status: OrderStatusType;
  billing: OrderBillingType;
  orderDate: string | Date;
  lastUpdate: string | Date;
};
