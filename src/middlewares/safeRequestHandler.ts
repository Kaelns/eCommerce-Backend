/* eslint-disable @typescript-eslint/no-explicit-any */
import core from 'express-serve-static-core';
import { RequestHandler, Request, Response } from 'express';

export function safeRequestHandler<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>(
  handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>,
  errorHandler?: (
    req: Request<P, ResBody, ReqBody, ReqQuery, Record<string, any>>,
    res: Response<ResBody, Record<string, any>>
  ) => void | Promise<void>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  return async (req, res, next) => {
    try {
      return await handler(req, res, next);
    } catch (handlerError) {
      try {
        if (errorHandler) {
          await errorHandler(req, res);
        }
      } catch (e) {
        /* empty */
      }
      next(handlerError);
    }
  };
}
