import React, { useEffect, useReducer, useMemo, useContext } from "react";
import { CartStateType, CartItemType } from "../../typings/cart";

type ContextType = {
  state: CartStateType;
  dispatch: React.Dispatch<any>;
} | null;

export enum CartActionType {
  RESET_CART = "RESET_CART",
  INITALIZE = "initialize",
  ADD_ITEM = "add_item",
  UPDATE_QUANTITY = "update_quantity",
  REMOVE_ITEM = "remove_item",
  VALID_VOUCHER = "valid_voucher",
  REMOVE_VOUCHER = "remove_voucher",
  UPDATE_BILLING_EMAIL = "update_billing_email",
}

export type CartAction =
  | {
      type: CartActionType.RESET_CART;
    }
  | {
      type: CartActionType.INITALIZE;
      payload: CartStateType;
    }
  | { type: CartActionType.ADD_ITEM; payload: CartItemType }
  | {
      type: CartActionType.UPDATE_QUANTITY;
      payload: { productId: string; size: string; quantity: number };
    }
  | { type: CartActionType.REMOVE_ITEM; payload: { productId: string; size: string } }
  | { type: CartActionType.VALID_VOUCHER; payload: string }
  | { type: CartActionType.REMOVE_VOUCHER; payload: null }
  | { type: CartActionType.UPDATE_BILLING_EMAIL; payload: string };

const CartContext = React.createContext<ContextType>(null);

const initState: CartStateType = {
  items: [],
  voucher: "",
  billingEmail: "",
};

export const cartReducer = (state: CartStateType, action: CartAction) => {
  switch (action.type) {
    case CartActionType.RESET_CART: {
      return { ...initState };
    }
    case CartActionType.INITALIZE: {
      return { ...state, ...action.payload };
    }
    case CartActionType.ADD_ITEM: {
      // Find if there's an existing item already:
      const { productId, size, quantity } = action.payload;
      const idx = state.items.findIndex((x) => x.productId === productId && x.size === size);
      const newQuantity = Math.min((state?.items[idx]?.quantity ?? 0) + quantity, 99);
      return {
        ...state,
        items:
          idx === -1
            ? [...state.items, action.payload]
            : [
                ...state.items.slice(0, idx),
                { ...state.items[idx], quantity: newQuantity },
                ...state.items.slice(idx + 1),
              ],
      };
    }

    case CartActionType.UPDATE_QUANTITY: {
      const { productId, size, quantity } = action.payload;
      const idx = state.items.findIndex((x) => x.productId === productId && x.size === size);
      return {
        ...state,
        items:
          idx === -1
            ? [...state.items]
            : [...state.items.slice(0, idx), { ...state.items[idx], quantity }, ...state.items.slice(idx + 1)],
      };
    }
    case CartActionType.REMOVE_ITEM: {
      const { productId, size } = action.payload;
      return {
        ...state,
        items: [...state.items.filter((x) => !(x.productId === productId && x.size === size))],
      };
    }

    case CartActionType.VALID_VOUCHER: {
      return { ...state, voucher: action.payload };
    }

    case CartActionType.REMOVE_VOUCHER: {
      return { ...state, voucher: "" };
    }

    case CartActionType.UPDATE_BILLING_EMAIL: {
      console.log(action.payload);
      return { ...state, billingEmail: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
    }
  }
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCardStore must be used within a CartProvider.");
  }
  return context;
};

const initStorageCart: CartStateType = { voucher: "", billingEmail: "", items: [] };

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    const cartState: CartStateType = initState;
    const storedCartData: CartStateType = JSON.parse(localStorage.getItem("cart") as string) ?? initStorageCart;
    cartState.items = storedCartData.items;
    cartState.billingEmail = storedCartData.billingEmail;
    dispatch({ type: CartActionType.INITALIZE, payload: cartState });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
