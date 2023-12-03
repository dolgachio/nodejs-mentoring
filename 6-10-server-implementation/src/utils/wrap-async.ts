import { NextFunction, Request, Response } from "express";

interface FunctionToWrap {
  (req?: Request, res?: Response, next?: NextFunction): Promise<void>;
}

export function wrapAsync(fn: FunctionToWrap) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
