export type OrderItemType = {
  id: string;
  imgUrl: string;
  size: string;
  price: number;
  quantity: number;
  itemName: string;
};

// eslint-disable-next-line no-shadow
export enum OrderStatusType {
  RECEIVED,
  PROCESSING,
  READY_TO_COLLECT,
  DELAY,
  COLLECTED,
}
