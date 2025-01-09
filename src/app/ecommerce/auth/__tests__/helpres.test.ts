import { Project } from '@commercetools/platform-sdk';
import { getAppData } from '@/app/ecommerce/auth/helpers.js';

jest.mock('@/services/api/v2/Api.js');

describe('getAppData auth helper', () => {
  it('returns valid data', () => {
    const project = {
      countries: ['BY', 'RU'],
      currencies: ['EU', 'RUB', 'USD']
    } as Project;

    const { countries, currencies, countriesWithoutPostal } = getAppData(project, true);

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

    const { countries, currencies, countriesWithoutPostal } = getAppData(project, true);

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
