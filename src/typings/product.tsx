export type ProductSizeTypes = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "2XL";

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
