import { CartItemType } from "../../../typings/cart";
import { VoucherType } from "../../../typings/voucher";
import { fakeDelay } from "../../../utils/functions/random";
import { productList } from "../product";

export const voucherDB: Record<string, VoucherType> = {
  LEMON_SQUEEZE: {
    id: "LEMON_SQUEEZE",
    discount: 20,
    isPercentage: true,
    description: "SCSE Welfare Package - 20% off",
  },
};

export type itemParamType = {
  id: string;
  size: string;
  quantity: number;
};

export type cartQueryInterface = {
  items: itemParamType[];
  appliedVoucher?: string | number | null;
};

export type cartQueryResponse = {
  data: {
    items: CartItemType[];
    voucherDetail: VoucherType;
  };
};

export const dummyBackendMerchResponse = async (productId: string) => {
  await fakeDelay(1000);
  if (productId) {
    return productList.find((product) => product.id === productId) ?? null;
  }
  return null;
};

export const dummyBackendVoucherResponse = async (voucher: string) => {
  await fakeDelay(1000);
  if (voucher && voucher in voucherDB) {
    return voucherDB[voucher];
  }
  return null;
};

export const cartVoucher: VoucherType = {
  id: "LEMON_SQUEEZE",
  discount: 15,
  isPercentage: false,
  description: "SCSECLUB#25 - $15 off",
};
