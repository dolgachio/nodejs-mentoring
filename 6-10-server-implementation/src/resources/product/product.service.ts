import { productRepository } from "../../repositories/product.repository";
import { DefaultDTO } from "../../types/DefaultDTO";
import { ProductEntity } from "../../types/product.entity";

export async function getAllProducts(): Promise<DefaultDTO<ProductEntity[]>> {
    const data = await productRepository.all();

    return {
        data,
        error: null,
    };
}

export async function getProductById(productId: string): Promise<DefaultDTO<ProductEntity | null>> {
    const data = await productRepository.getById(productId);

    return {
        data,
        error: null,
    };
}