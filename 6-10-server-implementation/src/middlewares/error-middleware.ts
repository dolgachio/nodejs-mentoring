import createError from "http-errors";
import { logger } from "./logging";
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(JSON.stringify(err));

  if (createError.isHttpError(err)) {
    res.status(err.statusCode).send(err);

    return;
  }

  next(err);

  return;
}
