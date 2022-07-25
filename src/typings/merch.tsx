export type MerchSizeType = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "2XL";

export type MerchDetailType = {
  slug: string;
  images: string[];
  name: string;
  price: number;
  sizes: MerchSizeType[];
  description: string;
};
