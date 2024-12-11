import { CartItemEntityPublic } from "../types/cart.entity";

export function calculateCartTotal(cartItems: CartItemEntityPublic[]): number {
    return cartItems.reduce<number>((total, cartItem) => {
        return total + cartItem.count * cartItem.product.price;
    }, 0);
} 