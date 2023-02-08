import { ProductType, ProductCategoryType } from "../../../typings/product";

export const productCategoryList: ProductCategoryType[] = ["sweater", "t-shirt", "hoodie"];

export const productList: ProductType[] = [
  {
    id: "1",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/453401/item/sggoods_69_453401.jpg?width=1008&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/444593/item/sggoods_32_444593.jpg?width=1008&impolicy=quality_75"
    ],
    name: "SCSE Sweater",
    sizes: ["s", "m", "l", "xl"],
    price: 2500,
    colorways: ["Brown", "Beige"],
    stock: [[5, 0, 3, 1], [1, 0, 5, 7]],
    isAvailable: true,
    productCategory: productCategoryList[0],
  },
  {
    id: "2",
    name: "Sweater for Winter",
    price: 4990,
    sizes: ["xs", "s", "m", "l", "xl"],
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/433037/item/sggoods_67_433037.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/433037/sub/sggoods_433037_sub1.jpg?width=1600&impolicy=quality_75",
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/433037/sub/sggoods_433037_sub2.jpg?width=1600&impolicy=quality_75",
    ],
    colorways: ["White", "Black", "Navy"],
    stock: [[0, 10, 0, 0, 2], [5, 0, 0, 1, 0], [0, 0, 0, 0, 0]],
    isAvailable: true,
    productCategory: productCategoryList[0],
  },
  {
    id: "3",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448969/item/sggoods_65_448969.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Graphic Tee - G",
    sizes: ["s", "m", "l", "xl"],
    colorways: ["Grey"],
    stock: [[0, 0, 3, 12]],
    price: 2500,
    isAvailable: true,
    productCategory: productCategoryList[0],
  },
  {
    id: "4",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/435805/item/sggoods_03_435805.jpg?width=1008&impolicy=quality_75",
    ],
    name: "There's Jam on his shirt",
    sizes: ["s", "m", "l", "xl"],
    colorways: ["Red"],
    stock: [[5, 0, 3, 1]],
    price: 8500,
    isAvailable: false,
    productCategory: productCategoryList[1],
  },
  {
    id: "5",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/446382/item/sggoods_15_446382.jpg?width=1008&impolicy=quality_75",
    ],
    name: "Blue note Records UT",
    sizes: ["s", "m", "l", "xl"],
    colorways: ["Blue", "Green"], 
    stock: [[0, 0, 0, 0], [0, 0, 0, 0]],
    price: 1200,
    isAvailable: true,
    productCategory: productCategoryList[1],
  },
  {
    id: "6",
    images: [
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/447167/item/goods_09_447167.jpg?width=1008&impolicy=quality_75",
    ],
    name: "Mango Looking T-Shirt from Daiso",
    sizes: ["s", "m", "l", "xl"],
    colorways: ["Yellow"],
    stock: [[0, 0, 0, 0]],
    price: 8500,
    isAvailable: false,
    productCategory: productCategoryList[1],
  },
];
