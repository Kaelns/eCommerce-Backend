import { AUTH_MIDDLEWARE_OPTIONS } from '@/services/api/v2/data/constants.js';
import { AuthMiddlewareOptionsUnion } from '@/services/api/v2/data/types.js';
import { TokenCache } from '@commercetools/ts-client';

export const getBaseAuthOptionsCopy = <T extends AuthMiddlewareOptionsUnion>(tokenCache: TokenCache): T => {
  return {
    ...AUTH_MIDDLEWARE_OPTIONS,
    credentials: { ...AUTH_MIDDLEWARE_OPTIONS.credentials },
    tokenCache
  } as T;
};
