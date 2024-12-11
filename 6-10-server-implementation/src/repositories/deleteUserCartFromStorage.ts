import { cartRepository } from "../resources/cart/data/cart.repository";

export async function deleteUserCartFromStorage(userId: string): Promise<boolean> {
  let success = true;

  try {
    await cartRepository.update(userId, { isDeleted: true });
  } catch (error) {
    success = false;
  }

  return success;
}
