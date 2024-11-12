import { AuthMiddlewareOptions, HttpMiddlewareOptions, TokenStore } from '@commercetools/ts-client';

export const LIMIT_ON_PAGE = 20;
export const EXPIRATION_TIME_SEC = 172800;

export const MOCK_TOKENSTORE: TokenStore = {
  token: '',
  refreshToken: '',
  expirationTime: 1
};

// TODO Change cartDraft
export const INIT_CART_DRAFT = {
  currency: 'USD',
  country: 'US'
} as const;

export const projectKey = process.env.CTS_PROJECT_KEY ?? '';

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.CTS_API_HOST ?? '',
  httpClient: fetch
} as const;

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.CTS_AUTH_HOST ?? '',
  projectKey: process.env.CTS_PROJECT_KEY ?? '',
  credentials: {
    clientId: process.env.CTS_CLIENT_ID ?? '',
    clientSecret: process.env.CTS_CLIENT_SECRET ?? ''
  },
  scopes: JSON.parse(process.env.CTS_SCOPES ?? '[]'),
  httpClient: fetch
} as const;
