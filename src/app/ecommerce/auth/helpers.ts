import _ from 'lodash';
import rateLimit from 'express-rate-limit';
import { api } from '@/services/ecommerce/v3/index.js';
import { Cookies } from '@/shared/data/enums.js';
import { AppData } from '@/shared/types/types.js';
import { Project } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/ts-client';
import { IS_PRODUCTION } from '@/shared/config/envConfig.js';
import { Response, Request } from 'express';
import { getAnonymCookieToTokenStore } from '@/shared/helpers/ecommerceSDK/get/getAnonymCookieToTokenStore.js';
import { EXPIRATION_TIME_ACCESS_MS, EXPIRATION_TIME_REFRESH_MS } from '@/shared/data/constants.js';
// @ts-ignore Doesn't work with "with { type: 'json' }"
import isoCountryList from '@/shared/json/ISO3166-countries.json';
// @ts-ignore Doesn't work with "with { type: 'json' }"
import isoCountryNoPostalList from '@/shared/json/ISO3166-countries-no-postal.json';

export const refreshUserLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 1,
  message: 'Too many requests from this IP, please try again after 1 minute',
  statusCode: 201
});
function setAnonymCookies(res: Response, tokenStore: TokenStore) {
  res.cookie(Cookies.ANONYM_ACCESS_TOKEN, tokenStore.token, {
    httpOnly: true,
    maxAge: EXPIRATION_TIME_ACCESS_MS,
    secure: IS_PRODUCTION,
    sameSite: 'strict'
  });
  res.cookie(Cookies.ANONYM_REFRESH_TOKEN, tokenStore.refreshToken ?? '', {
    httpOnly: true,
    maxAge: EXPIRATION_TIME_REFRESH_MS,
    secure: IS_PRODUCTION,
    sameSite: 'strict'
  });
}

export async function restoreAnonymUser(req: Request, res: Response): Promise<boolean> {
  try {
    const { token, refreshToken } = getAnonymCookieToTokenStore(req);
    const isExpiredAccess = !token;
    const isExpiredRefresh = !refreshToken;

    if (!isExpiredAccess) {
      return true;
    }

    if (isExpiredAccess && !isExpiredRefresh) {
      const newTokenStore = await api.user.restoreTokens(refreshToken);
      req.cookies[Cookies.ANONYM_ACCESS_TOKEN] = newTokenStore.token;
      req.cookies[Cookies.ANONYM_REFRESH_TOKEN] = newTokenStore.refreshToken ?? '';
      setAnonymCookies(res, newTokenStore);
      return true;
    }
  } catch (error) {
    console.warn(error);
  }
  return false;
}

export async function createAnonymUserCookie(res: Response): Promise<Project> {
  const [project, tokenStore] = await api.user.createAnonymousUser();
  setAnonymCookies(res, tokenStore);
  return project;
}

export function invalidateAccessTokens(req: Request) {
  req.cookies[Cookies.ANONYM_ACCESS_TOKEN] = '';

  if (req.user && req.user.refreshToken) {
    req.user.accessToken = '';
  }
}

export function convertProjectData(project: Project, isUserLogged: boolean): AppData {
  const { countries: countriesObj, currencies, languages } = project;
  const countries: Record<string, string> = {};
  const countriesWithoutPostal: Record<string, string> = {};

  countriesObj.forEach((key) => {
    countries[key] = isoCountryList[key as keyof typeof isoCountryList];

    if (key in isoCountryNoPostalList) {
      countriesWithoutPostal[key] = isoCountryNoPostalList[key as keyof typeof isoCountryNoPostalList];
    }
  });

  const result: AppData = { countries, currencies, languages, isUserLogged };

  if (!_.isEmpty(countriesWithoutPostal)) {
    result.countriesWithoutPostal = countriesWithoutPostal;
  }

  return result;
}
