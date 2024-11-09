import { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/ts-client';

export const LIMIT_ON_PAGE = 20;

// TODO Change cartDraft
export const INIT_CART_DRAFT = {
  currency: 'USD',
  country: 'US'
} as const;

export const projectKey = process.env.PROJECT_KEY ?? '';

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.API_HOST ?? '',
  httpClient: fetch
} as const;

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.AUTH_HOST ?? '',
  projectKey: process.env.PROJECT_KEY ?? '',
  credentials: {
    clientId: process.env.CLIENT_ID ?? '',
    clientSecret: process.env.CLIENT_SECRET ?? ''
  },
  scopes: JSON.parse(process.env.SCOPES ?? '[]'),
  httpClient: fetch
} as const;
