import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: Error, _: Request, res: Response, __: NextFunction) {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);

  const responceBody = {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'Not development' : err.stack
  };

  console.log(chalk.red('Error'), '\n', responceBody);
  res.json(responceBody);
}
