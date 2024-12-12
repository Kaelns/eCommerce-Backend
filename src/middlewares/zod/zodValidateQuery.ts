import { ParsedQueryString } from '@/shared/types/types.js';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function zodValidateQuery<T extends z.ZodTypeAny, U>(schema: T, convertFunc?: (reqQuery: ParsedQueryString) => U) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(convertFunc ? convertFunc(req.query) : req.query);
    if (!result.success) {
      const zodError = new z.ZodError(result.error.issues);
      res.status(400);
      return next(zodError);
    }
    req.query = result.data;
    next();
  };
}
