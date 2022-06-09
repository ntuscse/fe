import React from "react";
import { cartItems, cartVoucher } from "../../data/mock/cart";
import { CartStateType } from "../../typings/cart";
import { fakeDelay } from "../../utils/functions/random";

type contextType = { state: CartStateType; dispatch: React.Dispatch<any> };

const CartContext = React.createContext<contextType | null>(null);

const initState: CartStateType = {
  fetchStatus: false, // Maybe needed for BE validation of item existence when checkout.
  items: cartItems,
  voucherDetails: cartVoucher,
};

const initializer = (initialValue = initState) => {
  return (
    JSON.parse(localStorage.getItem("shopping-cart") as string) || initialValue
  );
};

export const addCartVoucher = async (
  voucher: string,
  dispatch: React.Dispatch<any>
) => {
  await fakeDelay();
  try {
    // API Call: Verify voucher with BE...
    dispatch({
      type: "valid_voucher",
      payload: {
        discount: 20,
        isPercentage: true,
        description: "SCSE Welfare Package - 20% off",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const cartReducer = (state: CartStateType, action: any) => {
  const { payload } = action;
  switch (action.type) {
    // TODO:
    case "add_item": {
      return { ...state };
    }
    case "update_quantity": {
      // Find object's index and update quantity.
      const { itemId, size, qty } = payload;
      const i = cartItems.findIndex((x) => x.id === itemId && x.size === size);
      if (Number.isNaN(i)) return { ...state };

      return {
        ...state,
        items: [
          ...state.items.slice(0, i),
          { ...state.items[i], quantity: qty },
          ...state.items.slice(i + 1),
        ],
      };
    }
    case "remove_item": {
      // Remove object.
      const { itemId, size } = payload;
      return {
        ...state,
        items: [
          ...state.items.filter(
            (item) => !(item.id === itemId && item.size === size)
          ),
        ],
      };
    }
    case "valid_voucher": {
      return { ...state, voucherDetails: { ...payload } };
    }
    case "remove_voucher": {
      const nextState = { ...state };
      delete nextState.voucherDetails;
      return nextState;
    }
    default: {
      throw new Error(`unhandled action type: ${action.type}`);
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

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, initializer());
  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
