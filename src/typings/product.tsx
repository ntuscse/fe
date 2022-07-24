export type ProductSizeTypes = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "2xl";

export type ProductCategoryType = {
  name: string;
};

export type ProductType = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: ProductSizeTypes[];
  productCategory: ProductCategoryType;
  isAvailable?: boolean;
};
