import { RequestHandler } from '@/shared/types/types.js';

export const noCache: RequestHandler = (_req, res, next) => {
  res.setHeader('Expires', '0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
};
