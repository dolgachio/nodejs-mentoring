import { Router } from "express";
import { wrapAsync } from "../../utils";
import { getAllProducts } from "./product.service";
import createError from "http-errors";

export const router = Router();

router.route("/").get(wrapAsync(async (req, res) => {
    try {
        const responseData = await getAllProducts();
        res?.status(200).json(responseData);
    } catch(error) {
        throw new createError.InternalServerError("[Product]: Cannot get all products");
    }
}));
