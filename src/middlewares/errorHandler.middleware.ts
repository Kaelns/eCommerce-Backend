import chalk from 'chalk';
import type { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);
  err.stack = process.env.NODE_ENV === 'production' ? 'Not development' : err.stack;

  console.log(chalk.red('Error'), '\n', err);
  res.json(err);
}