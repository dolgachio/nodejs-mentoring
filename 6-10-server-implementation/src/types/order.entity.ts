import { CartItemEntityPublic, cart } from './cart.entity';

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntityBase {
  userId: string;
  cartId: string;
  items: CartItemEntityPublic[] // products from CartEntity
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

export interface OrderEntity extends OrderEntityBase {
  id: string, // uuid
}

const order: OrderEntity = {
  id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  cartId: '',
  items: cart.items, 
  payment: {
    type: 'paypal',
    address: undefined,
    creditCard: undefined
  },
  delivery: {
    type: 'post',
    address: undefined
  },
  comments: '',
  status: 'created',
  total: 2,
}