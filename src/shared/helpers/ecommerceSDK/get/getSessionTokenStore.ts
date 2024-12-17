import { RequestAny } from '@/shared/types/types.js';
import { getTokenStoreFromUser } from '@/shared/helpers/ecommerceSDK/get/getTokenStoreFromUser.js';
import { getAnonymCookieToTokenStore } from '@/shared/helpers/ecommerceSDK/get/getAnonymCookieToTokenStore.js';

export function getSessionTokenStore<T extends RequestAny>(req: T) {
  return req.user ? getTokenStoreFromUser(req.user) : getAnonymCookieToTokenStore(req);
}
