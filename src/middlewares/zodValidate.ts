import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function zodValidate<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const zodError = new z.ZodError(result.error.issues);
      res.status(400);
      return next(zodError);
    }
    req.body = result.data;
    next();
  };
}
