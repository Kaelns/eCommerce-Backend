import _ from 'lodash';

const initEnvConfig = {
  ENV_CTS_SCOPES: process.env.CTS_SCOPES,
  ENV_CTS_API_HOST: process.env.CTS_API_HOST,
  ENV_CTS_CLIENT_ID: process.env.CTS_CLIENT_ID,
  ENV_CTS_AUTH_HOST: process.env.CTS_AUTH_HOST,
  ENV_CTS_PROJECT_KEY: process.env.CTS_PROJECT_KEY,
  ENV_CTS_CLIENT_SECRET: process.env.CTS_CLIENT_SECRET,

  ENV_SESSION_SECRET: process.env.SESSION_SECRET,
  ENV_ENCRYPTION_KEY_HEX: process.env.ENCRYPTION_KEY_HEX,

  NODE_ENV: process.env.NODE_ENV,
  ENV_PORT: process.env.PORT,
  ENV_DATABASE_URL: process.env.DATABASE_URL,
  ENV_WHITELIST_ORIGINS: process.env.WHITELIST_ORIGINS
};

if (_.isUndefined(initEnvConfig)) {
  throw new Error('Fatal: the app config is missing');
}

const envConfig = initEnvConfig as Record<keyof typeof initEnvConfig, string>;

export const {
  ENV_CTS_SCOPES,
  ENV_CTS_API_HOST,
  ENV_CTS_CLIENT_ID,
  ENV_CTS_AUTH_HOST,
  ENV_CTS_PROJECT_KEY,
  ENV_CTS_CLIENT_SECRET,

  ENV_SESSION_SECRET,
  ENV_ENCRYPTION_KEY_HEX,

  NODE_ENV,
  ENV_PORT,
  ENV_DATABASE_URL,
  ENV_WHITELIST_ORIGINS
} = envConfig;
