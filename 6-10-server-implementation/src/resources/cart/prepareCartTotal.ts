import { CartEntityPublic, CartTotal } from "../../types/cart.entity";
import { calculateCartTotal } from "./calculateCartTotal";

export function prepareCartTotal(cart: CartEntityPublic): CartTotal {
  return {
    cart,
    total: calculateCartTotal(cart.items),
  };
}
