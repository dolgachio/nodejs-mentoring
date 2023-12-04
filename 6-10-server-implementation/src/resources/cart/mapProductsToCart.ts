import {
    CartEntityPublic,
  CartEntityStored,
  CartItemEntityPublic,
} from "../../types/cart.entity";
import { ProductEntity } from "../../types/product.entity";

export function mapProductsToCart(
  cartStored: CartEntityStored,
  allProducts: ProductEntity[]
): CartEntityPublic {
  const { id, userId, items: itemsStored } = cartStored;

  const items = itemsStored.reduce<CartItemEntityPublic[]>(
    (result, item) => {
      const { productId, count } = item;
      const product = allProducts.find(
        (productData) => productData.id === productId
      );

      if (product) {
        const productToAdd: CartItemEntityPublic = {
          count,
          product,
        };

        result.push(productToAdd);
      }

      return result;
    },
    []
  );

  return {
    id,
    userId,
    items,
  };
}
