import { v4 as uuidv4 } from "uuid";
import {
  RepositoryCreate,
  RepositoryGetSingle,
  RepositoryUpdate,
} from "../../../types/Repository";
import { CartEntityStored, CartEntityStoredBase } from "../domain/types/cart.entity";
import { createEmptyCartStoredBase } from "../domain/utils/createEmptyCartStoredBase";

let carts: CartEntityStored[] = [];

function isCurrentCart(cartItem: CartEntityStored, userId: string): boolean {
  return cartItem.userId === userId && !cartItem.isDeleted;
}

export const getById = async (
  userId: string
): Promise<CartEntityStored | null> => {
  return carts.find((cartItem) => isCurrentCart(cartItem, userId)) || null;
};

export const createItem = async (
  cartDataBase: CartEntityStoredBase
): Promise<CartEntityStored> => {
  const id = uuidv4();
  const cartData: CartEntityStored = { ...cartDataBase, id };

  carts.push(cartData);

  return cartData;
};

export const update = async (
  userId: string,
  cartPatch: Partial<CartEntityStored>
): Promise<CartEntityStored> => {
  let cartStored = await getById(userId);
  if (!cartStored) {
    const newCartBase = createEmptyCartStoredBase(userId);
    cartStored = await createItem(newCartBase);
  }

  const { id: _, ...cartPatchNoId } = cartPatch;
  const cartStoredIndex = carts.findIndex((cartItem) =>
    isCurrentCart(cartItem, userId)
  );
  const cartStoreUpdated = { ...cartStored, ...cartPatchNoId };
  carts[cartStoredIndex] = cartStoreUpdated;

  return cartStoreUpdated as CartEntityStored;
};

type CartRepository = RepositoryGetSingle<CartEntityStored> &
  RepositoryCreate<CartEntityStoredBase, CartEntityStored> &
  RepositoryUpdate<CartEntityStored>;
export const cartRepository: CartRepository = {
  getById,
  createItem,
  update,
};
