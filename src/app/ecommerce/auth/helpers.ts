import _ from 'lodash';
import { api } from '@/services/api/v2/index.js';
import { Cookies } from '@/shared/data/enums.js';
import { AppData } from '@/shared/types/types.js';
import { Project } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/ts-client';
import { Response, Request } from 'express';
import { getAnonymCookieToTokenStore } from '@/shared/helpers/ecommerceSDK/get/getAnonymCookieToTokenStore.js';
import { EXPIRATION_TIME_ACCESS_MS, EXPIRATION_TIME_REFRESH_MS } from '@/shared/data/constants.js';
import isoCountryList from '@/shared/json/ISO3166-countries.json';
import isoCountryNoPostalList from '@/shared/json/ISO3166-countries-no-postal.json';

function setAnonymCookies(res: Response, tokenStore: TokenStore) {
  res.cookie(Cookies.ANONYM_ACCESS_TOKEN, tokenStore.token, {
    maxAge: EXPIRATION_TIME_ACCESS_MS,
    httpOnly: true
  });
  res.cookie(Cookies.ANONYM_REFRESH_TOKEN, tokenStore.refreshToken ?? '', {
    maxAge: EXPIRATION_TIME_REFRESH_MS,
    httpOnly: true
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

export function convertProjectData(project: Project, isUserLogged: boolean): AppData {
  const { countries: countriesObj, currencies } = project;
  const countries: Record<string, string> = {};
  const countriesWithoutPostal: Record<string, string> = {};

  countriesObj.forEach((key) => {
    countries[key] = isoCountryList[key as keyof typeof isoCountryList];

    if (key in isoCountryNoPostalList) {
      countriesWithoutPostal[key] = isoCountryNoPostalList[key as keyof typeof isoCountryNoPostalList];
    }
  });

  // TODO add countries obj without postal code if they exist in countries arr

  const result: AppData = { countries, currencies, isUserLogged };

  if (!_.isEmpty(countriesWithoutPostal)) {
    result.countriesWithoutPostal = countriesWithoutPostal;
  }

  return result;
}
