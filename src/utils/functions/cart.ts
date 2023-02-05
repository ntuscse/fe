import { CartItemType } from "../../typings/cart";

export const getQtyInCart = (cartItems: CartItemType[], productId: string, colorway: string, size: string) : number => {
    const cartItem = cartItems.find((item) => {
        return (item.productId === productId) && (item.size === size) && (item.colorway === colorway);
    })

    if (cartItem) {
        return cartItem.quantity;
    } 
    return 0;
}

export const displayQtyInCart = (cartItems: CartItemType[], productId: string, colorway: string, size: string) : string => {
    const qty = getQtyInCart(cartItems, productId, colorway, size);
    if (qty > 0) {
        return `You have already added ${qty} to your cart.`;
    }
    return "";
}
