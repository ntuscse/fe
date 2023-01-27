// export type ProductSizeTypes = "3xs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl";

export type ProductCategoryType = string;

export type ProductType = {
  id: string;
  name: string;
  price: number;
  stock: Map<string, number>;
  images?: string[];
  colorways?: string[];
  productCategory?: ProductCategoryType;
};
