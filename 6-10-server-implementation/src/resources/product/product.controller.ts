import { Router } from "express";
import { wrapAsync } from "../../utils";
import { getAllProducts, getProductById } from "./product.service";
import createError from "http-errors";

export const router = Router();

router.route("/").get(
  wrapAsync(async (req, res) => {
    try {
      const responseData = await getAllProducts();
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
    const productDTO = await getProductById(productId);
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
