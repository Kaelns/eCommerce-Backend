import { responceOk } from '@/shared/data/constants.js';
import { NextFunction, Response } from 'express';

export function doneHandler<T extends object>(next: NextFunction, res: Response, customResBody?: T) {
  return (err: unknown) => {
    if (err) {
      next(err);
    }
    res.status(200).json(customResBody ?? responceOk);
  };
}
