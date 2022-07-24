import { CartItemType } from "../../typings/cart";
import { VoucherType } from "../../typings/voucher";

export function calCartSubTotal(cartItems: CartItemType[]): number {
  if (cartItems === undefined) {
    return 0;
  }
  return cartItems.reduce((acc: number, cur: CartItemType) => {
    return 0;
    // return acc + cur.price * cur.quantity;
  }, 0);
}

export function calDiscountAmt(subTotal: number, voucher?: VoucherType): number {
  if (voucher === undefined) {
    return 0;
  }
  if (voucher?.isPercentage) {
    return subTotal * (voucher.discount / 100);
  }
  return voucher?.discount ?? 0;
}
