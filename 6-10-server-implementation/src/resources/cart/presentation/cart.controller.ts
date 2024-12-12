import { Router } from "express";
import Joi from "joi";
import createHttpError from "http-errors";

// Utils and Shared
import { wrapAsync } from "../../../utils";
import { getUserIdFromHeaders } from "../../../utils/getUserIdFromHeaders";
import { DefaultDTO } from "../../../types/DefaultDTO";

// Domain
import {
  checkoutUserCart,
  deleteUserCart,
  getUserCart,
  updateCart,
} from "../domain/cart.service";
import { NoCartForCheckout } from "../domain/errors/NoCartForCheckoutError";
import { CartTotal } from "../domain/types/cart.entity";
import { OrderEntity } from "../domain/types/order.entity";

export const router = Router();

router.route("/").get(
  wrapAsync(async (req, res) => {
    const headers = req.headers;
    const userId = getUserIdFromHeaders(headers);

    try {
      const userCart = await getUserCart(userId);
      const userCartDTO: DefaultDTO<CartTotal> = {
        data: userCart,
        error: null,
      };

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
      const updateResult = await updateCart(userId, cartUpdateDTORaw);
      const responseData: DefaultDTO<CartTotal> = {
        data: updateResult,
        error: null,
      };

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

    const deleteResult = await deleteUserCart(userId);
    const responseData: DefaultDTO<{
      success: boolean;
    }> = { data: deleteResult, error: null };

    res?.status(200).json(responseData);
  })
);

router.route("/checkout").post(
  wrapAsync(async (req, res) => {
    const headers = req.headers;
    const userId = getUserIdFromHeaders(headers);

    try {
      const checkoutResult = await checkoutUserCart(userId);
      const responseData: DefaultDTO<{
        order: OrderEntity;
      }> = { data: checkoutResult, error: null };

      res?.status(200).json(responseData);
    } catch (error) {
      if (error instanceof NoCartForCheckout) {
        throw new createHttpError.NotFound(error.message);
      }

      throw error;
    }
  })
);
