import { ProductEntity, product as bookProduct } from './product.entity'

export interface CartItemEntityStored {
  productId: string;
  count: number;
}

export interface CartItemEntityPublic {
  product: ProductEntity;
  count: number;
}

interface CartEntityBase<TItemEntity> {
  userId: string;
  items: TItemEntity[];
}

// Public
export interface CartEntityPublic extends CartEntityBase<CartItemEntityPublic> {
  id: string; // uuid
}

// Stored
export interface CartEntityStoredBase extends CartEntityBase<CartItemEntityStored> {
  isDeleted: boolean;
}

export interface CartEntityStored extends CartEntityStoredBase {
  id: string; // uuid
}

const cartItem: CartItemEntityPublic = {
  product: bookProduct,
  count: 2,
}

export interface CartTotal {
  cart: CartEntityPublic,
  total: number,
}

export const cart: CartEntityPublic = {
  id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  // isDeleted: false,
  items: [cartItem],
}