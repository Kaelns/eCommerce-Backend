import { APIErrors } from '@/services/api/v2/data/enums.js';
import { TokenStore } from '@commercetools/ts-client';
import { isValidTokenStore } from '@/services/api/v2/data/guards.js';

export function checkTokenStoreThrowErr(tokenStore: TokenStore | undefined): TokenStore {
  if (!isValidTokenStore(tokenStore)) {
    throw new Error(APIErrors.TOKEN_STORE_INVALID);
  }
  return tokenStore;
}
