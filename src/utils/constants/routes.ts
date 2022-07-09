type Routes = {
  HOME: string;
  SIGN_UP: string;
  CONFIRM_SIGN_UP: string;
  SIGN_IN: string;
  FORGOT_PASSWORD: string;
  MERCHANDISE_LIST: string;
  CART: string;
  CHECKOUT: string;
  ORDER_SUMMARY: string;
  ORDER_HISTORY: string;
  MERCH_DETAIL: string;
};

const routes: Routes = {
  HOME: "/",
  SIGN_UP: "/sign-up",
  CONFIRM_SIGN_UP: "/confirm-sign-up",
  SIGN_IN: "/sign-in",
  FORGOT_PASSWORD: "/forgot-password",
  MERCHANDISE_LIST: "/merchandise-list",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER_SUMMARY: "/summary",
  ORDER_HISTORY: "/order-history",
  MERCH_DETAIL: "/merch",
};

export default routes;
