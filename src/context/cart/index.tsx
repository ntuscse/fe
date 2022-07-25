import React, { useEffect, useReducer, useMemo } from "react";
import {
  dummyBackendCartResponse,
  dummyBackendVoucherResponse,
} from "../../data/mock/cart";

import {
  CartStateType,
  StoredCartStateType,
  CartItemType,
} from "../../typings/cart";
import { VoucherType } from "../../typings/voucher";

type ContextType = {
  state: CartStateType;
  dispatch: React.Dispatch<any>;
} | null;

export enum CartActionType {
  INITALIZE = "initialize",
  ADD_ITEM = "add_item",
  FETCH_LOADING = "fetch_loading",
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
  | { type: CartActionType.FETCH_LOADING; payload: null }
  | { type: CartActionType.ADD_ITEM; payload: CartItemType }
  | {
      type: CartActionType.UPDATE_QUANTITY;
      payload: { id: string; size: string; quantity: number };
    }
  | { type: CartActionType.REMOVE_ITEM; payload: { id: string; size: string } }
  | { type: CartActionType.APPLY_VOUCHER; payload: VoucherType }
  | { type: CartActionType.REMOVE_VOUCHER; payload: null };

const CartContext = React.createContext<ContextType>(null);

const initStorageCart: StoredCartStateType = {
  items: [],
  appliedVoucher: null,
};

const initState: CartStateType = {
  fetchStatus: false,
  items: [],
  voucherDetails: null,
};

export const addCartVoucher = async (
  voucher: string,
  dispatch: React.Dispatch<any>
) => {
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
    case CartActionType.FETCH_LOADING: {
      return { ...state, fetchStatus: true };
    }

    case CartActionType.ADD_ITEM: {
      // Find if there's an existing item already:
      const { id, size, quantity } = action.payload;
      const idx = state.items.findIndex((x) => x.id === id && x.size === size);
      const newQuantity = (state?.items[idx]?.quantity ?? 0) + quantity;

      return {
        ...state,
        fetchStaus: false,
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
        fetchStaus: false,
        items:
          idx === -1
            ? [...state.items]
            : [
                ...state.items.slice(0, idx),
                { ...state.items[idx], quantity },
                ...state.items.slice(idx + 1),
              ],
      };
    }
    case CartActionType.REMOVE_ITEM: {
      // Remove object.
      const { id, size } = action.payload;
      return {
        ...state,
        items: [
          ...state.items.filter((x) => !(x.id === id && x.size === size)),
        ],
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
  const context = React.useContext(CartContext);
  if (context === null) {
    throw new Error("useCardStore must be used within a CartProvider.");
  }
  return context;
};

export const fetchCartDetails = async (storedCartData: StoredCartStateType) => {
  try {
    const response = await dummyBackendCartResponse(storedCartData);
    return response?.data;
  } catch (err) {
    throw new Error(err as string);
  }
};

const initializer = async (dispatch: React.Dispatch<any>) => {
  // Get stored cart data
  const storedCartData: StoredCartStateType =
    JSON.parse(localStorage.getItem("cart") as string) ?? initStorageCart;

  dispatch({
    type: CartActionType.FETCH_LOADING,
  });
  console.log("HERE", storedCartData);
  // Based on the Data retrieved, we map.
  const data = await fetchCartDetails(storedCartData);

  const cartState: CartStateType = {
    fetchStatus: false,
    items: data?.items,
    voucherDetails: data?.voucherDetail,
  };
  console.log("HERE cart state", cartState);
  dispatch({
    type: CartActionType.INITALIZE,
    payload: cartState,
  });
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    initializer(dispatch);
  }, []);

  useEffect(() => {
    const cartStorage: StoredCartStateType = {
      appliedVoucher: state.voucherDetails?.id ?? null,
      items: state.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        size: item.size,
      })),
    };
    localStorage.setItem("cart", JSON.stringify(cartStorage));
    console.log("IM HERE BEING TRIGGERED", cartStorage);
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
