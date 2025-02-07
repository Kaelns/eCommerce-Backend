/* eslint-disable @typescript-eslint/no-explicit-any */
import core from 'express-serve-static-core';
import { RequestHandler } from 'express';
import { SafeRequestErrorHandler } from '@/shared/types/types.js';

export function safeRequestHandler<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>(
  handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>,
  errorHandler?: SafeRequestErrorHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  let counter = 1;
  return async (req, res, next) => {
    try {
      return await handler(req, res, next);
    } catch (handlerError) {
      try {
        if (errorHandler && counter) {
          counter--;
          await errorHandler(req, res, next, handler, handlerError);
          counter = 1;
          return;
        }
      } catch (e) {
        //
      }
      counter = 1;
      next(handlerError);
    }
  };
}
