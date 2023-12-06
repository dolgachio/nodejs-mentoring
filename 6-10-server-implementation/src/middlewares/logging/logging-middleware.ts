import { logger } from './logger';
import { Request, Response, NextFunction } from "express";

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const { method, url, query, body } = req;
  const logInfo = JSON.stringify({
    method,
    url,
    query,
    body
  });

  logger.info(logInfo);

  next();
  return;
}
