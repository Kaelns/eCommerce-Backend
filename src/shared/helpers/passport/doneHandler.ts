import { responceOk } from '@/shared/data/constants.js';
import { NextFunction, Response } from 'express';

export function doneHandler(next: NextFunction, res: Response) {
  return (err: unknown) => {
    if (err) {
      next(err);
    }
    res.status(200).json(responceOk);
  };
}
