import { api } from '@/services/api/v2/index.js';
import { Project } from '@commercetools/platform-sdk';
import { Cookies } from '@/shared/data/enums.js';
import { TokenStoreObj } from '@/services/api/v2/lib/TokenStore.js';
import { tokenStoreMock } from '@/__tests__/__mocks__/express.mock.js';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { convertProjectData, restoreAnonymUser } from '@/app/ecommerce/auth/helpers.js';

jest.mock('@/services/api/v2/index.js');

describe('getAppData auth helper', () => {
  it('returns valid data', () => {
    const project = {
      countries: ['BY', 'RU'],
      currencies: ['EU', 'RUB', 'USD']
    } as Project;

    const { countries, currencies, countriesWithoutPostal } = convertProjectData(project, true);

    expect(currencies).toBe(project.currencies);
    expect(countriesWithoutPostal).toBeUndefined();
    expect(countries).toEqual({
      BY: 'Belarus',
      RU: 'Russian Federation'
    });
  });

  it('also returns countries without postal if any', () => {
    const project = {
      countries: ['BY', 'RU', 'AO', 'AG'],
      currencies: ['EU', 'RUB', 'USD']
    } as Project;

    const { countries, currencies, countriesWithoutPostal } = convertProjectData(project, true);

    expect(currencies).toBe(project.currencies);
    expect(countries).toEqual({
      AO: 'Angola',
      AG: 'Antigua And Barbuda',
      BY: 'Belarus',
      RU: 'Russian Federation'
    });
    expect(countriesWithoutPostal).toEqual({
      AO: 'Angola',
      AG: 'Antigua And Barbuda'
    });
  });
});

describe('restoreAnonymUser auth helper', () => {
  const newTokenStoreMock = new TokenStoreObj('newAccess', 'newRefresh');

  const { res, clearMockRes } = getMockRes();
  const restoreTokensMock = jest.spyOn(api.user, 'restoreTokens').mockImplementation(async () => newTokenStoreMock);

  beforeEach(() => {
    jest.clearAllMocks();
    clearMockRes();
  });

  it('return false if all tokens are expired', async () => {
    const req = getMockReq({
      cookies: {
        [Cookies.ANONYM_ACCESS_TOKEN]: '',
        [Cookies.ANONYM_REFRESH_TOKEN]: ''
      }
    });

    const isAnonym = await restoreAnonymUser(req, res);

    expect(restoreTokensMock).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(isAnonym).toBeFalsy();
  });

  it('return true if access - not expired, refresh - not expired', async () => {
    const req = getMockReq({
      cookies: {
        [Cookies.ANONYM_ACCESS_TOKEN]: tokenStoreMock.token,
        [Cookies.ANONYM_REFRESH_TOKEN]: tokenStoreMock.refreshToken
      }
    });

    const isAnonym = await restoreAnonymUser(req, res);

    expect(restoreTokensMock).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(isAnonym).toBeTruthy();
  });

  it("return true if access token - not expired, and don't react on expired refresh", async () => {
    const req = getMockReq({
      cookies: {
        [Cookies.ANONYM_ACCESS_TOKEN]: tokenStoreMock.token,
        [Cookies.ANONYM_REFRESH_TOKEN]: ''
      }
    });

    const isAnonym = await restoreAnonymUser(req, res);

    expect(restoreTokensMock).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(isAnonym).toBeTruthy();
  });

  it('return true after restoring tokens (access - expired, refresh - not)', async () => {
    const req = getMockReq({
      cookies: {
        [Cookies.ANONYM_ACCESS_TOKEN]: '',
        [Cookies.ANONYM_REFRESH_TOKEN]: tokenStoreMock.refreshToken
      }
    });

    const isAnonym = await restoreAnonymUser(req, res);

    expect(restoreTokensMock).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledTimes(2);
    expect(res.cookie).toHaveBeenNthCalledWith(1, Cookies.ANONYM_ACCESS_TOKEN, newTokenStoreMock.token, expect.anything());
    expect(res.cookie).toHaveBeenNthCalledWith(2, Cookies.ANONYM_REFRESH_TOKEN, newTokenStoreMock.refreshToken, expect.anything());
    expect(isAnonym).toBeTruthy();
  });
});
