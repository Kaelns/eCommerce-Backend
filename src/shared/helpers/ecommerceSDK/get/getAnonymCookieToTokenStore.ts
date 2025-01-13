import { Cookies } from '@/shared/data/enums.js';
import { Request } from 'express';
import { TokenStoreObj } from '@/services/api/v2/lib/TokenStore.js';

export function getAnonymCookieToTokenStore<T extends Request>(req: T) {
  const accessToken: string = req.cookies[Cookies.ANONYM_ACCESS_TOKEN] ?? '';
  const refreshToken: string = req.cookies[Cookies.ANONYM_REFRESH_TOKEN] ?? '';
  return new TokenStoreObj(accessToken, refreshToken);
}
