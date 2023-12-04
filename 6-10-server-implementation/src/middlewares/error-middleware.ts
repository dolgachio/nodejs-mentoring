import createError from "http-errors";
import { logger } from "./logging";
import { Request, Response, NextFunction } from "express";
import { DefaultDTO } from "../types/DefaultDTO";

export function errorMiddleware(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(JSON.stringify(err));

  if (createError.isHttpError(err)) {
    const errorDTO: DefaultDTO<null> = {
      data: null,
      error: err,
    }

    res.status(err.statusCode).send(errorDTO);

    return;
  }

  next(err);

  return;
}
