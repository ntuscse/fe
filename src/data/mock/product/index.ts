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
      "https://ima dge.uniqlo.com/UQ/ST3/sg/imagesgoods/448391/item/sggoods_36_448391.jpg?width=1600&impolicy=quality_75",
    ],
    name: "SCSE Sweater - Brown",
    sizes: ["S", "M", "L", "XL"],
    price: 25.0,
    isAvailable: false,
    productCategory: productCategoryList[0],
  },
  {
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
    isAvailable: true,
    productCategory: productCategoryList[0],
  },
  {
    id: "blue-sweater",
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/448584/item/sggoods_09_448584.jpg?width=1008&impolicy=quality_75",
    ],
    name: "SCSE Graphic Tee - G",
    sizes: ["S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL"],
    price: 85.0,
    isAvailable: true,
    productCategory: productCategoryList[1],
  },
];
