import { CorsOptions } from 'cors';

const whitelist = JSON.stringify(process.env.WHITELIST_ORIGINS) ?? [];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!whitelist.length) {
      callback(new Error('CORS whitelist is empty'));
    } else if (origin && ~whitelist.indexOf(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
