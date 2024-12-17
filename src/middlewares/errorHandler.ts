import chalk from 'chalk';
import { convertError } from '@/shared/helpers/ecommerceSDK/convertError.js';
import { ErrorRequestHandler } from 'express';
import { serializeError } from 'serialize-error';

export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);

  const convertedError = convertError(err);
  const responseErr = serializeError(convertedError ?? { message: 'Unknown Error' });

  console.log(chalk.red('Error'), '\n', err);
  res.json(responseErr);
};
