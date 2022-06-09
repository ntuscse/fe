import { VoucherType } from "./voucher";

export type CartItemType = {
  id: string;
  imgUrl: string;
  size: string;
  price: number;
  quantity: number;
  itemName: string;
};

export type CartStateType = {
  fetchStatus: boolean;
  items: CartItemType[];
  voucherDetails?: VoucherType;
};
