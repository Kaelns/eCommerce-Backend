import { ApiClientType } from '@/services/api/v2/data/enums.js';
import { ByProjectKeyProductProjectionsSearchRequestBuilder } from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenCache,
  UserAuthOptions
} from '@commercetools/ts-client';

type AnonymousAuthMiddlewareOptions = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
    anonymousId?: string;
  };
  scopes?: Array<string>;
  oauthUri?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  httpClient?: Function;
  tokenCache?: TokenCache;
};

export interface AuthMiddlewareOptionsSelector {
  [ApiClientType.DEFAULT]: AuthMiddlewareOptions;
  [ApiClientType.ANONYM]: AnonymousAuthMiddlewareOptions;
  [ApiClientType.USER]: PasswordAuthMiddlewareOptions;
  [ApiClientType.TOKEN]: undefined;
  [ApiClientType.REFRESH_TOKEN]: RefreshAuthMiddlewareOptions;
}

export type QueryProductsArgs = NonNullable<NonNullable<Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]>['queryArgs']>;

export const isObject = (elem: unknown): elem is object => {
  return typeof elem === 'object' && elem !== null && !Array.isArray(elem);
};

export const isUserAuthOptions = (user: unknown): user is UserAuthOptions => {
  return isObject(user) && 'username' in user && 'password' in user;
};
