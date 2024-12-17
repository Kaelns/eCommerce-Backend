import axios from 'axios';
import { AuthMiddlewareOptions, HttpMiddlewareOptions, TokenStore } from '@commercetools/ts-client';
import {
  ENV_CTS_SCOPES,
  ENV_CTS_API_HOST,
  ENV_CTS_CLIENT_ID,
  ENV_CTS_AUTH_HOST,
  ENV_CTS_PROJECT_KEY,
  ENV_CTS_CLIENT_SECRET
} from '@/shared/config/envConfig.js';

// * General project settings
export const CTS_TOKEN = `${ENV_CTS_CLIENT_ID}:${ENV_CTS_CLIENT_SECRET}`;

export const HTTP_MIDDLEWARE_OPTIONS: HttpMiddlewareOptions = {
  host: ENV_CTS_API_HOST,
  httpClient: axios ?? fetch
} as const;

export const AUTH_MIDDLEWARE_OPTIONS: AuthMiddlewareOptions = {
  host: ENV_CTS_AUTH_HOST,
  projectKey: ENV_CTS_PROJECT_KEY,
  credentials: {
    clientId: ENV_CTS_CLIENT_ID,
    clientSecret: ENV_CTS_CLIENT_SECRET
  },
  scopes: JSON.parse(ENV_CTS_SCOPES),
  httpClient: axios ?? fetch
} as const;

// * Other constants

export const PRODUCTS_LIMIT_ON_PAGE = 20;
export const TOKEN_EXPIRATION_TIME_SEC = 172800;

export const MOCK_TOKEN_STORE: TokenStore = {
  token: '',
  refreshToken: '',
  expirationTime: 1
} as const;

// TODO Change cartDraft
export const INIT_CART_DRAFT = {
  currency: 'USD'
} as const;
