import { Router } from "express";
import { wrapAsync } from "../../../utils";
import { getAllProducts, getProductById } from "../domain/product.service";
import createError from "http-errors";
import { DefaultDTO } from "../../../types/DefaultDTO";
import { ProductEntity } from "../domain/types/product.entity";

export const router = Router();

router.route("/").get(
  wrapAsync(async (_, res) => {
    try {
      const products = await getAllProducts();
      const responseData: DefaultDTO<ProductEntity[]> = {
        data: products,
        error: null,
      };
      
      res?.status(200).json(responseData);
    } catch (error) {
      throw new createError.InternalServerError(
        "[Product]: Cannot get all products"
      );
    }
  })
);

router.route("/:productId").get(
  wrapAsync(async (req, res) => {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    const productDTO: DefaultDTO<ProductEntity | null> = {
      data: product,
      error: null,
    }
    
    if (!productDTO.data) {
      throw new createError.NotFound("[Product] Product Not Found");
    }
    
    try {
      res?.status(200).json(productDTO);
    } catch (error) {
      throw new createError.InternalServerError(
        "[Product]: Cannot get all products"
      );
    }
  })
);
