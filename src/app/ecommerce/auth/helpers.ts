import { api } from '@/services/api/v2/index.js';
import { Cookies } from '@/shared/data/enums.js';
import { AppData } from '@/shared/types/types.js';
import { Project } from '@commercetools/platform-sdk';
import { Response } from 'express';
import { EXPIRATION_TIME_MS } from '@/shared/data/constants.js';
import isoCountryList from '@/shared/json/ISO3166-countries.json';

export async function createAnonymousUserCookie(res: Response) {
  const [project, tokenStore] = await api.user.createAnonymousUser();

  res.cookie(Cookies.ANONYM_ACCESS_TOKEN, tokenStore.token, {
    maxAge: EXPIRATION_TIME_MS,
    httpOnly: true
  });
  if (tokenStore.refreshToken) {
    res.cookie(Cookies.ANONYM_REFRESH_TOKEN, tokenStore.refreshToken, {
      maxAge: EXPIRATION_TIME_MS,
      httpOnly: true
    });
  }
  return project;
}

export function getAppData(project: Project, isUserLogged: boolean): AppData {
  const { countries, currencies } = project;

  const countriesObj = countries.reduce<Record<string, string>>((acc, key) => {
    acc[key] = isoCountryList[key as keyof typeof isoCountryList];
    return acc;
  }, {});

  // TODO add countries obj without postal code is they exist in countries arr

  return { countriesObj, currencies, isUserLogged };
}
