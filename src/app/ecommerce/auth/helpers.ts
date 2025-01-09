import _ from 'lodash';
import { api } from '@/services/api/v2/index.js';
import { Cookies } from '@/shared/data/enums.js';
import { AppData } from '@/shared/types/types.js';
import { Project } from '@commercetools/platform-sdk';
import { Response } from 'express';
import { EXPIRATION_TIME_MS } from '@/shared/data/constants.js';
import isoCountryList from '@/shared/json/ISO3166-countries.json';
import isoCountryNoPostalList from '@/shared/json/ISO3166-countries-no-postal.json';

export async function createAnonymUserCookie(res: Response) {
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
