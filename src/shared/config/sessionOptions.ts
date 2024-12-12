import { ENV_SESSION_SECRET } from '@/shared/config/envConfig.js';
import { EXPIRATION_TIME_MS } from '@/shared/data/constants.js';
import { SessionOptions } from 'express-session';

export const sessionOptions: SessionOptions = {
  secret: ENV_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: EXPIRATION_TIME_MS
  }
};
