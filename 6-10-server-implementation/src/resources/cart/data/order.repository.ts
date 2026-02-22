import { RepositoryCreate } from "../../../types/Repository";
import { v4 as uuidv4 } from "uuid";
import { OrderEntity, OrderEntityBase } from "../domain/types/order.entity";

let orders: OrderEntity[] = [];

async function createItem(
  orderEntityBase: OrderEntityBase,
): Promise<OrderEntity> {
  const id = uuidv4();

  const orderEntity = { ...orderEntityBase, id };
  orders.push(orderEntity);

  return orderEntity;
}

type OrderRepository = RepositoryCreate<OrderEntityBase, OrderEntity>;

export const orderRepository: OrderRepository = {
  createItem,
};
