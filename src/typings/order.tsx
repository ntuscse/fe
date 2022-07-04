import { VoucherType } from "./voucher";

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
  imgUrl: string;
  size: string;
  price: number;
  quantity: number;
  itemName: string;
};

export type OrderBillingType = {
  total: number;
  subtotal: number;
  appliedVoucher?: VoucherType;
};

export type OrderType = {
  orderNo: string;
  items: OrderItemType[];
  status: OrderStatusType;
  billing: OrderBillingType;
  orderDate: string | Date;
  lastUpdate: string | Date;
};

export type OrderHistoryType = {
  orders: OrderType[];
};
