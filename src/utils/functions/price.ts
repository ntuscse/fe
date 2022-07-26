import { ProductInfoMapType } from "../../pages/Cart/Cart";
import { CartItemType } from "../../typings/cart";
import { VoucherType } from "../../typings/voucher";

export function calCartSubTotal(cartItems: CartItemType[], productInfo: ProductInfoMapType): number {
  if (cartItems === undefined) {
    return 0;
  }

  return cartItems.reduce((acc: number, cur: CartItemType) => {
    return acc + cur.quantity * (productInfo?.[cur.id]?.price ?? 0);
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
