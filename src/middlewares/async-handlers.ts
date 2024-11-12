import core from 'express-serve-static-core';
import { RequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function asyncHandler<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>(
  handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  return (req, res, next) => {
    const fnReturn = handler(req, res, next);
    return Promise.resolve(fnReturn).catch(next);
  };
}
