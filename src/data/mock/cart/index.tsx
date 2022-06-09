import { CartItemType } from "../../../typings/cart";
import { VoucherType } from "../../../typings/voucher";

export const cartItems: CartItemType[] = [
  {
    id: "1",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448391/item/sggoods_36_448391.jpg?width=1600&impolicy=quality_75",
    itemName: "SCSE Sweater - Brown",
    size: "M",
    price: 25.0,
    quantity: 3,
  },
  {
    id: "2",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/452344/item/sggoods_09_452344.jpg?width=1008&impolicy=quality_75",
    itemName: "SCSE Shirt - Black",
    size: "L",
    price: 30.0,
    quantity: 2,
  },
  {
    id: "3",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448584/item/sggoods_09_448584.jpg?width=1008&impolicy=quality_75",
    itemName: "SCSE Graphic Tee - G",
    size: "XL",
    price: 25.0,
    quantity: 3,
  },
  {
    id: "4",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/444593/item/sggoods_32_444593.jpg?width=1008&impolicy=quality_75",
    itemName: "SCSE Sweater - Beige",
    size: "M",
    price: 85.0,
    quantity: 3,
  },
];

export const cartVoucher: VoucherType = {
  discount: 15,
  isPercentage: false,
  description: "SCSECLUB#25 - $15 off",
};
