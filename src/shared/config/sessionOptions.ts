import { EXPIRATION_TIME_MS } from '@/shared/data/constants.js';
import { SessionOptions } from 'express-session';

export const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET ?? '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: EXPIRATION_TIME_MS
  }
};
