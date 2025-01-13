import session from 'express-session';
import pgSimple from 'connect-pg-simple';
import { SessionOptions } from 'express-session';
import { EXPIRATION_TIME_ACCESS_MS } from '@/shared/data/constants.js';
import { ENV_DATABASE_URL, ENV_SESSION_SECRET } from '@/shared/config/envConfig.js';

const PostgresqlStore = pgSimple(session);
const sessionStore = new PostgresqlStore({
  conString: ENV_DATABASE_URL,
  createTableIfMissing: true
});

export const sessionOptions: SessionOptions = {
  secret: ENV_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: EXPIRATION_TIME_ACCESS_MS
  },
  store: sessionStore
};
