import { cartRepository } from "../data/cart.repository";
import { orderRepository } from "../data/order.repository";

// Move to controller
import { DefaultDTO } from "../../../types/DefaultDTO";

// Entities
import { CartEntityStored, CartTotal } from "./types/cart.entity";
import { OrderEntity, OrderEntityBase } from "./types/order.entity";
import { NoCartForCheckout } from "./errors/NoCartForCheckoutError";

// Product Dependency potentially replace with service usage
import { productRepository } from "../../product/data/product.repository";

// Utils
import { deleteUserCartFromStorage } from "./utils/deleteUserCartFromStorage";
import { createEmptyCartStoredBase } from "./utils/createEmptyCartStoredBase";
import { calculateCartTotal } from "./utils/calculateCartTotal";
import { mapProductsToCart } from "./utils/mapProductsToCart";
import { prepareCartTotal } from "./utils/prepareCartTotal";
import { validateCartUpdate } from "./utils/validateCartUpdate";

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
): Promise<DefaultDTO<CartTotal>> {
  let userCartStored = await getCartStored(userId);

  const products = await productRepository.getAll();
  const cart = mapProductsToCart(userCartStored, products);
  const cartTotal = prepareCartTotal(cart);

  return { data: cartTotal, error: null };
}

export async function deleteUserCart(
  userId: string
): Promise<DefaultDTO<{ success: boolean }>> {
  const success = await deleteUserCartFromStorage(userId);

  return { data: { success }, error: null };
}

export async function checkoutUserCart(
  userId: string
): Promise<DefaultDTO<{ order: OrderEntity }>> {
  const cartStored = await cartRepository.getById(userId);
  if (!cartStored || cartStored.items.length === 0) {
    throw new NoCartForCheckout("[Cart]: No Cart For Checkout");
  }

  const products = await productRepository.getAll();
  const cartWithProducts = mapProductsToCart(cartStored, products);

  const orderBase: OrderEntityBase = {
    userId,
    cartId: cartWithProducts.id,
    items: cartWithProducts.items,

    payment: {
      type: "paypal",
    },

    delivery: {
      type: "post",
      address: "address",
    },

    comments: "",
    status: "created",
    total: calculateCartTotal(cartWithProducts.items),
  };

  const createdOrder = await orderRepository.createItem(orderBase);
  await deleteUserCartFromStorage(userId);

  return { data: { order: createdOrder }, error: null };
}

export async function updateCart(
  userId: string,
  cartUpdateDTORaw: unknown
): Promise<DefaultDTO<CartTotal>> {
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
    } else {
      // Update Existing Item
      cartItems = cartItems.map((item) => {
        if (item.productId === cartUpdateDTO.productId) {
          return { ...item, count: cartUpdateDTO.count };
        }

        return item;
      });
    }
  }

  const cartStoredUpdated = await cartRepository.update(userId, {
    items: cartItems,
  });
  const products = await productRepository.getAll();
  const cart = mapProductsToCart(cartStoredUpdated, products);
  const cartTotal = prepareCartTotal(cart);

  return { data: cartTotal, error: null };
}
