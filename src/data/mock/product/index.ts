import { ProductType, ProductCategoryType } from "../../../typings/product";

export const productCategoryList: ProductCategoryType[] = [
  {
    name: "sweater",
  },
  {
    name: "t-shirt",
  },
  {
    name: "hoodie",
  },
];

export const productList: ProductType[] = [
  {
    id: "brown-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/453401/item/sggoods_69_453401.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Sweater - Brown",
    sizes: ["s", "m", "l", "xl"],
    price: 25.0,
    isAvailable: false,
    productCategory: productCategoryList[0],
  },
  {
    id: "yellow-sweater",
    name: "Sweater for Winter",
    price: 49.9,
    sizes: ["xs", "s", "m", "l", "xl"],
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/item/sggoods_00_446638.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/sub/sggoods_446638_sub2.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/sub/sggoods_446638_sub7.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446638/sub/sggoods_446638_sub13.jpg?width=1600&impolicy=quality_75",
    ],
    isAvailable: true,
    productCategory: productCategoryList[0],
  },
  {
    id: "blue-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448969/item/sggoods_65_448969.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Graphic Tee - G",
    sizes: ["s", "m", "l", "xl"],
    price: 25.0,
    isAvailable: true,
    productCategory: productCategoryList[0],
  },

  {
    id: "red-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/444593/item/sggoods_32_444593.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Sweater - Beige",
    sizes: ["s", "m", "l", "xl"],
    price: 85.0,
    isAvailable: true,
    productCategory: productCategoryList[1],
  },
  {
    id: "apple-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446633/item/sggoods_41_446633.jpg?width=1008&impolicy=quality_75",
    ],
    name: "There's Jam on his shirt",
    sizes: ["s", "m", "l", "xl"],
    price: 85.0,
    isAvailable: true,
    productCategory: productCategoryList[1],
  },
  {
    id: "indigo-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446382/item/sggoods_15_446382.jpg?width=1008&impolicy=quality_75",
    ],
    name: "Blue note Records UT",
    sizes: ["s", "m", "l", "xl"],
    price: 12.0,
    isAvailable: true,
    productCategory: productCategoryList[1],
  },
  {
    id: "jam-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/447167/item/goods_09_447167.jpg?width=1008&impolicy=quality_75",
    ],
    name: "Mango Looking T-Shirt from Daiso",
    sizes: ["s", "m", "l", "xl"],
    price: 85.0,
    isAvailable: true,
    productCategory: productCategoryList[1],
  },
];
