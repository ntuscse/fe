import { CartItemType } from "../../typings/cart";

/*export const cartItem: CartItemType = {
    productId: '2022_001',
    size:"M",
    colorway:"Black",
    quantity: 1,
};*/

export const cartItem = (qty: number): CartItemType => {
    return {
        productId: '2022_001',
        size:"M",
        colorway:"Black",
        quantity: qty,
    }
}

export const cartItems = (): CartItemType[] => {
    return [{
        productId: '2022_001',
        size:"M",
        colorway:"Black",
        quantity: 2,
    },{
        productId: '2022_002',
        size:"XL",
        colorway:"Green",
        quantity: 3,
    }]
}