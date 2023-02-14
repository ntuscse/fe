export type CartItemType = {
  productId: string;
  size: string;
  colorway: string;
  quantity: number;
};

/**
 * @Title CartItemType
 * @description Displayed on FE in shopping-cart
 */

export type CartStateType = {
  voucher: string | null;
  items: CartItemType[];
  name: string;
  billingEmail: string;
};
export type ProductInfoType = {
  name: string;
  image: string;
  price: number;
};

export type CartPriceType = {
  currency: string;
  subtotal: number;
  discount: number;
  grandTotal: number;
};

export type CartResponseDto = {
  items: [
    {
      id: string;
      name: string;
      price: number;
      images: string[];
      sizes: string;
      productCategory: string;
      isAvailable: boolean;
      quantity: number;
    }
  ];
  price: {
    currency: string;
    subtotal: number;
    discount: number;
    grandTotal: number;
  };
};

export type CheckoutResponseDto = {
  orderId: string;
  items: [
    {
      id: string;
      name: string;
      price: number;
      images: string[];
      sizes: string[];
      productCategory: string;
      isAvailable: boolean;
      quantity: number;
    }
  ];
  price: {
    currency: string;
    subtotal: number;
    discount: number;
    grandTotal: number;
  };
  payment: {
    paymentGateway: string;
    clientSecret: string;
  };
  email: string;
};

export type ProductInfoMapType = Record<string, ProductInfoType>;
