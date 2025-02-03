import { APIErrors, APIErrorsCodes } from '@/services/ecommerce/v3/data/enums.js';
import { TokenStore } from '@commercetools/ts-client';
import { isValidTokenStore } from '@/services/ecommerce/v3/data/guards.js';
import { BackendError } from '@/shared/helpers/ecommerceSDK/BackendError.js';

export function checkTokenStoreThrowErr(tokenStore: TokenStore | undefined): TokenStore {
  if (!isValidTokenStore(tokenStore)) {
    throw new BackendError(APIErrors.TOKEN_STORE_INVALID, APIErrorsCodes.BAD_GATEWAY);
  }
  return tokenStore;
}
