import { DefaultDTO } from "../../../types/DefaultDTO";

import { productRepository } from "../data/product.repository";
import { ProductEntity } from "./types/product.entity";

export async function getAllProducts(): Promise<ProductEntity[]> {
    return await productRepository.getAll();
}

export async function getProductById(productId: string): Promise<ProductEntity | null> {
    return await productRepository.getById(productId);
}