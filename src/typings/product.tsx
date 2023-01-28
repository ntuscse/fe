// export type ProductSizeTypes = "3xs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl";

import SizeDialog from "../pages/MerchDetail/SizeDialog";

export type ProductCategoryType = string;

export type ProductType = {
  id: string;
  name: string;
  price: number;
  stock: number[][]; // stock[colorway][size] = qty
  sizes: string[];
  colorways: string[];
  images?: string[];
  productCategory?: ProductCategoryType;
  isAvailable: boolean;
};
