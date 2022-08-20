import React, { useEffect, useReducer, useMemo, useContext } from "react";
import { dummyBackendVoucherResponse } from "../../data/mock/cart";

import { VoucherType } from "../../typings/voucher";
import { CartStateType, StoredCartStateType, CartItemType } from "../../typings/cart";

type ContextType = {
  state: CartStateType;
  dispatch: React.Dispatch<any>;
} | null;

export enum CartActionType {
  INITALIZE = "initialize",
  ADD_ITEM = "add_item",
  UPDATE_QUANTITY = "update_quantity",
  REMOVE_ITEM = "remove_item",
  APPLY_VOUCHER = "apply_voucher",
  REMOVE_VOUCHER = "remove_voucher",
}

export type CartAction =
  | {
      type: CartActionType.INITALIZE;
      payload: CartStateType;
    }
  | { type: CartActionType.ADD_ITEM; payload: CartItemType }
  | {
      type: CartActionType.UPDATE_QUANTITY;
      payload: { id: string; size: string; quantity: number };
    }
  | { type: CartActionType.REMOVE_ITEM; payload: { id: string; size: string } }
  | { type: CartActionType.APPLY_VOUCHER; payload: VoucherType }
  | { type: CartActionType.REMOVE_VOUCHER; payload: null };

const CartContext = React.createContext<ContextType>(null);

const initState: CartStateType = {
  fetchStatus: false,
  items: [],
  voucherDetails: null,
};

export const addCartVoucher = async (voucher: string, dispatch: React.Dispatch<any>) => {
  try {
    // API Call: Verify voucher with BE...
    const res = await dummyBackendVoucherResponse(voucher);
    dispatch({
      type: CartActionType.APPLY_VOUCHER,
      payload: res,
    });
  } catch (e) {
    console.log(e);
  }
};

export const cartReducer = (state: CartStateType, action: CartAction) => {
  switch (action.type) {
    case CartActionType.INITALIZE: {
      return { ...state, ...action.payload };
    }

    case CartActionType.ADD_ITEM: {
      // Find if there's an existing item already:
      const { id, size, quantity } = action.payload;
      const idx = state.items.findIndex((x) => x.id === id && x.size === size);
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
      // Find if there's an existing item already:
      const { id, size, quantity } = action.payload;
      const idx = state.items.findIndex((x) => x.id === id && x.size === size);

      return {
        ...state,
        items:
          idx === -1
            ? [...state.items]
            : [...state.items.slice(0, idx), { ...state.items[idx], quantity }, ...state.items.slice(idx + 1)],
      };
    }
    case CartActionType.REMOVE_ITEM: {
      // Remove object.
      const { id, size } = action.payload;
      return {
        ...state,
        items: [...state.items.filter((x) => !(x.id === id && x.size === size))],
      };
    }

    case CartActionType.APPLY_VOUCHER: {
      return { ...state, voucherDetails: action.payload };
    }

    case CartActionType.REMOVE_VOUCHER: {
      return { ...state, voucherDetails: null };
    }
    default: {
      throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
      // throw new Error(`unhandled action type: ${action.type}`);
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

const initStorageCart: StoredCartStateType = { items: [] };

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    const cartState: CartStateType = { items: [], fetchStatus: false };
    const storedCartData: StoredCartStateType = JSON.parse(localStorage.getItem("cart") as string) ?? initStorageCart;
    cartState.items = storedCartData.items;
    dispatch({ type: CartActionType.INITALIZE, payload: cartState });
    console.log("Init Cart:", cartState);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
    console.log("Storage Cart being triggered:", state);
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
