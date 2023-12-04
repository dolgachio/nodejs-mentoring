// import { faker } from "@faker-js/faker";
import {
  RepositoryGetSingle,
  RepositoryGetAll,
  RepositoryDelete,
} from "../types/Repository";
import { ProductEntity } from "../types/product.entity";

let products: ProductEntity[] = [
  {
    id: "39096f47-34fa-41a2-b7ab-e0a6e838c822",
    title: "Bacon",
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    price: 234,
  },
  {
    id: "0430ed9c-b419-47e6-8568-229143d1c02a",
    title: "Computer",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 258,
  },
  {
    id: "d84cf653-9ee0-4477-97f5-d523b10aa88c",
    title: "Chips",
    description: "The Football Is Good For Training And Recreational Purposes",
    price: 135,
  },
];

async function getAll(): Promise<ProductEntity[]> {
  return products;
}

async function getById(id: string): Promise<ProductEntity | null> {
  return products.find((productItem) => productItem.id === id) || null;
}

async function deleteById(id: string): Promise<void> {
  products = products.filter((productItem) => productItem.id !== id);

  return;
}

type ProductRepository = RepositoryGetAll<ProductEntity> &
  RepositoryGetSingle<ProductEntity> &
  RepositoryDelete;
export const productRepository: ProductRepository = {
  getAll,
  getById,
  deleteById,
};
