import { unknownError } from '@/shared/data/constants.js';
import { convertError } from '@/shared/helpers/ecommerceSDK/convertError.js';
import { serializeError } from 'serialize-error';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  const convertedError = convertError(err, res);
  const responseErr = serializeError(convertedError ?? unknownError);

  res.status(res.statusCode !== 200 ? res.statusCode : 500);

  res.json(responseErr);
};
