import { Router } from "express";
import { wrapAsync } from "../../utils";
import { getUserIdFromHeaders } from "../../utils/getUserIdFromHeaders";
import { checkoutUserCart, deleteUserCart, getUserCart, updateCart } from "./cart.service";
import createHttpError from "http-errors";
import Joi from "joi";
import { NoCartForCheckout } from "./NoCartForCheckoutError";

export const router = Router();

router.route("/").get(
  wrapAsync(async (req, res) => {
    const headers = req.headers;
    const userId = getUserIdFromHeaders(headers);

    try {
      const userCartDTO = await getUserCart(userId);
      res?.status(200).json(userCartDTO);
    } catch (error) {
      throw new createHttpError.InternalServerError("[Cart] Cannot Get Cart");
    }
  })
);

router.route("/").put(
  wrapAsync(async (req, res) => {
    const headers = req.headers;
    const userId = getUserIdFromHeaders(headers);
    const cartUpdateDTORaw: unknown = req.body;

    try {
      const responseData = await updateCart(userId, cartUpdateDTORaw);
      res?.status(200).json(responseData);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        throw new createHttpError.BadRequest(
          "[Cart] Bad request for updating the cart"
        );
      }

      throw error;
    }
  })
);

router.route("/").delete(
  wrapAsync(async (req, res) => {
    const headers = req.headers;
    const userId = getUserIdFromHeaders(headers);

    const responseData = await deleteUserCart(userId);

    res?.status(200).json(responseData);
  })
);

router.route("/checkout").post(
  wrapAsync(async (req, res) => {
    const headers = req.headers;
    const userId = getUserIdFromHeaders(headers);

    try {
      const responseData = await checkoutUserCart(userId);
      res?.status(200).json(responseData);
    } catch(error) {
      if (error instanceof NoCartForCheckout) {
        throw new createHttpError.NotFound(error.message);
      }

      throw error;
    }

  })
);
