import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { userRepository } from "./user.repository";

import { wrapAsync } from "../../utils";

import { getUserIdFromHeaders } from "../../utils/getUserIdFromHeaders";

export const authMiddleware = wrapAsync(
  async (req: Request, _: Response, next: NextFunction) => {
    const headers = req.headers;
    let userId = getUserIdFromHeaders(headers);

    if (!userId) {
      throw new createError.Forbidden("[Auth]: Authorization info is missing")
    }

    const user = await userRepository.getById(userId);
    if (!user) {
      throw new createError.Unauthorized(
        `[Auth] User does not exist or userId is not passed`
      );
    }

    next();
  }
);
