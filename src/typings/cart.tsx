import { VoucherType } from "./voucher";

export type CartItemType = {
  id: string;
  size: string;
  quantity: number;
};

/**
 * @Title CartItemType
 * @description Displayed on FE in shopping-cart
 */

export type StoredCartStateType = {
  items: CartItemType[];
};

export type CartStateType = {
  fetchStatus: boolean;
  items: CartItemType[];
  voucherDetails?: VoucherType;
};

export type ProductInfoType = {
  name: string;
  image: string;
  price: number;
};

export type ProductInfoMapType = Record<string, ProductInfoType>;
