import { cartRepository } from "../../repositories/cart.repository";
import { createEmptyCartStoredBase } from "../../repositories/createEmptyCartStoredBase";
import { productRepository } from "../../repositories/product.repository";
import { DefaultDTO } from "../../types/DefaultDTO";
import {
  CartEntityPublic,
  CartEntityStored,
  CartEntityStoredBase,
} from "../../types/cart.entity";
import { mapProductsToCart } from "./mapProductsToCart";
import { validateCartUpdate } from "./validateCartUpdate";

async function getCartStored(userId: string): Promise<CartEntityStored> {
  let storedCart = await cartRepository.getById(userId);

  if (storedCart) {
    return storedCart;
  }

  const newCart = createEmptyCartStoredBase(userId);
  return await cartRepository.createItem(newCart);
}

export async function getUserCart(
  userId: string
): Promise<DefaultDTO<CartEntityPublic>> {
  let userCartStored = await getCartStored(userId);
  if (userCartStored.isDeleted) {
    await cartRepository.deleteById(userId);
    const newCartStoredBase = createEmptyCartStoredBase(userId);
    userCartStored = await cartRepository.createItem(newCartStoredBase);
  }

  const products = await productRepository.getAll();
  const data = mapProductsToCart(userCartStored, products);

  return { data, error: null };
}

export async function deleteUserCart(
  userId: string
): Promise<DefaultDTO<{ success: boolean }>> {
  let success = true;

  try {
    await cartRepository.update(userId, { isDeleted: true });
  } catch (error) {
    success = false;
  }

  return { data: { success }, error: null };
}

export async function updateCart(
  userId: string,
  cartUpdateDTORaw: unknown
): Promise<DefaultDTO<CartEntityPublic>> {
  const { error, value: cartUpdateDTO } = validateCartUpdate(cartUpdateDTORaw);

  if (error) {
    throw error;
  }

  const cartStored = await getCartStored(userId);
  let cartItems = cartStored.items;

  // No This Item Anymore
  if (cartUpdateDTO.count === 0) {
    cartItems = cartItems.filter(
      (item) => item.productId !== cartUpdateDTO.productId
    );
  }

  if (cartUpdateDTO.count > 0) {
    const cartItemIndex = cartItems.findIndex(
      (item) => item.productId === cartUpdateDTO.productId
    );
    
    // Add New Item
    if (cartItemIndex === -1) {
      cartItems = [...cartItems, cartUpdateDTO];
    }

    // Update Existing Item
    cartItems = cartItems.map((item) => {
      if (item.productId === cartUpdateDTO.productId) {
        return { ...item, count: cartUpdateDTO.count };
      }

      return item;
    });
  }

  const cartStoredUpdated = await cartRepository.update(userId, {
    items: cartItems,
  });
  const products = await productRepository.getAll();
  const data = mapProductsToCart(cartStoredUpdated, products);

  return { data, error: null };
}
