import { CartEntityStoredBase } from "../types/cart.entity";

export function createEmptyCartStoredBase(
  userId: string
): CartEntityStoredBase {
  return {
    userId,
    isDeleted: false,
    items: [],
  };
}
