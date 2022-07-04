import { VoucherType } from "../../../typings/voucher";
import {
  OrderItemType,
  OrderStatusType,
  OrderType,
} from "../../../typings/order";

export const orderItems: OrderItemType[] = [
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
];

export const voucher: VoucherType = {
  discount: 15,
  isPercentage: false,
  description: "SCSECLUB#25 - $15 off",
};

export const orderSummary: OrderType = {
  orderNo: "1234 5678 9102 3456",
  items: orderItems,
  status: OrderStatusType.READY_TO_COLLECT,
  billing: {
    subtotal: 125.0,
    appliedVoucher: voucher,
    total: 110.0,
  },
  orderDate: new Date(1210981217 * 1000).toLocaleDateString("en-SG"),
  lastUpdate: new Date(1210981217 * 1000).toLocaleDateString("en-SG"),
};
