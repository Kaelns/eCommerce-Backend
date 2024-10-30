import chalk from 'chalk';
import type { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);
  err.stack = process.env.NODE_ENV === 'production' ? 'Not development' : err.stack;

  console.log(chalk.red('Error'), '\n', err);
  res.json(err);
};
