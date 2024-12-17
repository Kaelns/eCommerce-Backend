import { Cookies } from '@/shared/data/enums.js';
import { Request } from 'express';
import { TokenStoreObj } from '@/services/api/v2/lib/TokenStore.js';

export function getAnonymCookieToTokenStore<T extends Request>(req: T) {
  const anonymAccessToken: string = req.cookies[Cookies.ANONYM_ACCESS_TOKEN] ?? '';
  return new TokenStoreObj(anonymAccessToken);
}
