import { CartItemType } from "../../../typings/cart";
import { VoucherType } from "../../../typings/voucher";
import { MerchDetailType } from "../../../typings/merch";
import { fakeDelay } from "../../../utils/functions/random";
import { ProductType } from "../../../typings/product";

export const voucherDB: Record<string, VoucherType> = {
  LEMON_SQUEEZE: {
    id: "LEMON_SQUEEZE",
    discount: 20,
    isPercentage: true,
    description: "SCSE Welfare Package - 20% off",
  },
};
export const merchDB: Record<string, ProductType> = {
  "brown-sweater": {
    id: "brown-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448391/item/sggoods_36_448391.jpg?width=1600&impolicy=quality_75",
    ],
    name: "SCSE Sweater - Brown",
    sizes: ["S", "M", "L", "XL"],
    price: 25.0,
  },
  "yellow-sweater": {
    id: "yellow-sweater",
    name: "Sweater for Winter",
    price: 49.9,
    sizes: ["XS", "S", "M", "L", "XL"],

    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/item/sggoods_00_446638.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/sub/sggoods_446638_sub2.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/sub/sggoods_446638_sub7.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/sub/sggoods_446638_sub13.jpg?width=1600&impolicy=quality_75",
    ],
  },
  "blue-sweater": {
    id: "blue-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448584/item/sggoods_09_448584.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Graphic Tee - G",
    sizes: ["S", "M", "L", "XL"],
    price: 25.0,
    description: "",
  },

  "red-sweater": {
    id: "red-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/444593/item/sggoods_32_444593.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Sweater - Beige",
    sizes: ["S", "M", "L", "XL"],
    price: 85.0,
    description: "",
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

export const dummyBackendMerchResponse = async (merchid: string) => {
  await fakeDelay(1000);
  if (merchid && merchid in merchDB) {
    return merchDB[merchid];
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

export const dummyBackendCartResponse = async (
  param: cartQueryInterface
): Promise<cartQueryResponse> => {
  const { items, appliedVoucher } = param;
  const response: cartQueryResponse = {
    data: { items: [], voucherDetail: null },
  };

  items?.forEach((item: itemParamType) => {
    if (item?.id && item?.id in merchDB) {
      response.data.items.push({
        ...item,
        imgUrl: merchDB?.[item?.id]?.images?.[0],
        itemName: merchDB[item?.id]?.name,
        price: merchDB[item?.id]?.price,
      });
    }
  });

  if (appliedVoucher && appliedVoucher in voucherDB) {
    response.data.voucherDetail = voucherDB[appliedVoucher];
  }

  await fakeDelay(1000);

  return response;
};

export const cartVoucher: VoucherType = {
  id: "LEMON_SQUEEZE",
  discount: 15,
  isPercentage: false,
  description: "SCSECLUB#25 - $15 off",
};
