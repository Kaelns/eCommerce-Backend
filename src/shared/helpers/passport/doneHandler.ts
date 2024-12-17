import { NextFunction, Response } from 'express';

export function doneHandler(next: NextFunction, res: Response) {
  return (err: unknown) => {
    if (err) {
      next(err);
    }
    res.sendStatus(200);
  };
}
