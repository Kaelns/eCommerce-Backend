import { APIErrors } from '@/services/ecommerce/v3/data/enums.js';
import { TokenStore } from '@commercetools/ts-client';
import { isValidTokenStore } from '@/services/ecommerce/v3/data/guards.js';

export function checkTokenStoreThrowErr(tokenStore: TokenStore | undefined): TokenStore {
  if (!isValidTokenStore(tokenStore)) {
    throw new Error(APIErrors.TOKEN_STORE_INVALID);
  }
  return tokenStore;
}
