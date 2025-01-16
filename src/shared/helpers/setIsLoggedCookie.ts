import { IS_PRODUCTION } from '@/shared/config/envConfig.js';
import { EXPIRATION_TIME_REFRESH_MS } from '@/shared/data/constants.js';
import { Cookies } from '@/shared/data/enums.js';
import { Response } from 'express';

export function setIsLoggedCookie(res: Response, isLogged: boolean) {
  res.cookie(Cookies.USER_IS_LOGGED, isLogged, {
    httpOnly: false,
    maxAge: EXPIRATION_TIME_REFRESH_MS,
    secure: IS_PRODUCTION,
    sameSite: 'strict'
  });
}
