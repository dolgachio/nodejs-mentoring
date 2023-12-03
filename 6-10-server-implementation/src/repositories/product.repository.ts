import { faker } from "@faker-js/faker";
import { RepositoryBase, RepositoryDelete } from "../types/Repository"
import { ProductEntity } from "../types/product.entity"

let products: ProductEntity[] = [];
for (let i = 0; i < 10; i++) {
    const productItem: ProductEntity = {
        id: faker.string.uuid(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 10, max: 700 }),
    };

    products.push(productItem);
}

async function all(): Promise<ProductEntity[]> {
    return products;
}

async function getById(id: string): Promise<ProductEntity | null> {
    return products.find(productItem => productItem.id === id) || null;
}

async function deleteById(id: string): Promise<void> {
    products = products.filter((productItem) => productItem.id !== id);
    
    return;
}

type ProductRepository = RepositoryBase<ProductEntity> & RepositoryDelete;
export const productRepository: ProductRepository = {
    all,
    getById,
    deleteById,
}