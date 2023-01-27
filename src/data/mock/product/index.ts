import { ProductType, ProductCategoryType } from "../../../typings/product";

export const productCategoryList: ProductCategoryType[] = ["sweater", "t-shirt", "hoodie"];

export const productList: ProductType[] = [
  {
    id: "1",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/453401/item/sggoods_69_453401.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Sweater - Brown",
    stock: new Map<string, number>([
      ["s", 5],
      ["m", 0], 
      ["l", 7],
      ["xl", 3]
    ]),
    price: 25.0,
    productCategory: productCategoryList[0],
  },
  {
    id: "2",
    name: "Sweater for Winter",
    price: 49.9,
    stock: new Map<string, number>([
      ["xs", 5],
      ["s", 8],
      ["m", 10], 
      ["l", 0],
      ["xl", 0]
    ]),
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/433037/item/sggoods_67_433037.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/433037/sub/sggoods_433037_sub1.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/433037/sub/sggoods_433037_sub2.jpg?width=1600&impolicy=quality_75",
    ],
    productCategory: productCategoryList[0],
  },
  {
    id: "3",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448969/item/sggoods_65_448969.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Graphic Tee - G",
    stock: new Map<string, number>([
      ["s", 1],
      ["m", 5], 
      ["l", 7],
      ["xl", 3]
    ]),
    price: 25.0,
    productCategory: productCategoryList[0],
  },

  {
    id: "4",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/444593/item/sggoods_32_444593.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Sweater - Beige",
    stock: new Map<string, number>([
      ["s", 5],
      ["m", 5], 
      ["l", 5],
      ["xl", 5]
    ]),
    price: 85.0,
    productCategory: productCategoryList[1],
  },
  {
    id: "5",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/435805/item/sggoods_03_435805.jpg?width=1008&impolicy=quality_75",
    ],
    name: "There's Jam on his shirt",
    stock: new Map<string, number>([
      ["s", 0],
      ["m", 0], 
      ["l", 0],
      ["xl", 0]
    ]),
    price: 85.0,
    productCategory: productCategoryList[1],
  },
  {
    id: "6",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446382/item/sggoods_15_446382.jpg?width=1008&impolicy=quality_75",
    ],
    name: "Blue note Records UT",
    stock: new Map<string, number>([
      ["s", 5],
      ["m", 5], 
      ["l", 5],
      ["xl", 5]
    ]),
    price: 12.0,
    productCategory: productCategoryList[1],
  },
  {
    id: "7",
    images: [
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/447167/item/goods_09_447167.jpg?width=1008&impolicy=quality_75",
    ],
    name: "Mango Looking T-Shirt from Daiso",
    stock: new Map<string, number>([
      ["s", 1],
      ["m", 1], 
      ["l", 2],
      ["xl", 2]
    ]),
    price: 85.0,
    productCategory: productCategoryList[1],
  },
];
