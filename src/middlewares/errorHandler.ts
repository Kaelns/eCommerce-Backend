import chalk from 'chalk';
import { convertError } from '@/utils/convertError.js';
import { ErrorRequestHandler } from 'express';
import { serializeError } from 'serialize-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);

  const convertedError = convertError(err);
  const responceErr = serializeError(convertedError ?? { message: 'Unknown Error' });

  console.log(chalk.red('Error'), '\n', err);
  res.json(responceErr);
};
