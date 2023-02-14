import React, {useContext, useMemo, useState} from "react";
import { CheckoutResponseDto } from "../../typings/cart";

type ContextType = {
    state: CheckoutResponseDto | null;
    setState:  React.Dispatch<React.SetStateAction<CheckoutResponseDto | null>>
} | null

const CheckoutContext = React.createContext<ContextType>(null)

export const useCheckoutStore = () => {
    const context = useContext(CheckoutContext);
    if (context === null){
        throw new Error("useCheckoutStore must be used within a CheckoutProvider.")
    }
    return context
}

export const CheckoutProvider: React.FC = ({ children }) => {
    const [checkoutState, setCheckoutState] = useState<CheckoutResponseDto | null>(null)

    const value = useMemo(() => ({
        state: checkoutState,
        setState: setCheckoutState
    }), [checkoutState])
    return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>

}
