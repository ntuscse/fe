import {
  OrderHistoryType,
  OrderItemType,
  OrderStatusType,
} from "../../../typings/order";

export const orderHistory: OrderHistoryType = {
  orders: [
    {
      orderNo: "1234 5678 9102 3456",
      items: [
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
            "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/444545/item/sggoods_00_444545.jpg?width=1008&impolicy=quality_75",
          itemName: "SCSE Shirt - Black",
          size: "L",
          price: 30.0,
          quantity: 2,
        },
      ],
      status: OrderStatusType.DELAY,
      billing: {
        subtotal: 125.0,
        total: 110.0,
      },
      orderDate: new Date(1280981217 * 1000).toLocaleDateString("en-SG"),
      lastUpdate: new Date(1610981217 * 1000).toLocaleDateString("en-SG"),
    },
    {
      orderNo: "1234 5678 9102 3456",
      items: [
        {
          id: "1",
          imgUrl:
            "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/457111/item/sggoods_00_457111.jpg?width=1008&impolicy=quality_75",
          itemName: "SCSE Hoodie - White",
          size: "M",
          price: 25.0,
          quantity: 3,
        },
        {
          id: "2",
          imgUrl:
            "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/425974/item/sggoods_56_425974.jpg?width=1600&impolicy=quality_75",
          itemName: "SCSE Shirt - Blue",
          size: "L",
          price: 30.0,
          quantity: 2,
        },
      ],
      status: OrderStatusType.RECEIVED,
      billing: {
        subtotal: 125.0,
        total: 151210.0,
      },
      orderDate: new Date(73636123123 * 1000).toLocaleDateString("en-SG"),
      lastUpdate: new Date(83636123123 * 1000).toLocaleDateString("en-SG"),
    },

    {
      orderNo: "1234 5678 9102 3456",
      items: [
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
      ],
      status: OrderStatusType.PROCESSING,
      billing: {
        subtotal: 1525.0,
        total: 320.0,
      },
      orderDate: new Date(1210981217 * 1000).toLocaleDateString("en-SG"),
      lastUpdate: new Date(1210981217 * 1000).toLocaleDateString("en-SG"),
    },
  ],
};
