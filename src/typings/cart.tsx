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

/**
 * Login -> Fetch cart detail based on items (id, size, qty), voucher -> callback tells what has been removed (some item has been removed toast).
 * Merch -> Add to cart, add to actual (itemId, img, price, etc)
 *
 * Cart -> Fetch again using items(id, size, qty), update state :)
 *
 * What needs to be done:
 * 1. Separate types for CartItem and StoredCartItem.
 * 2. Do a fetch function, stimulating a query for DB -> Update state
 *
 * Store StoredCartState in LocalStorage.
 * Qn: When do we send API call to BE
 *
 */
