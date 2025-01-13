import { AppData } from '@/shared/types/types.js';
import { Project } from '@commercetools/platform-sdk';
import { Selectable } from 'kysely';
import { CommerceUser } from '@/database/postgres/types.js';
import { TokenStoreObj } from '@/services/api/v2/lib/TokenStore.js';
import { Request, Response } from 'express';

export const emptyReqMock: Request = {} as Request;
export const emptyResMock: Response = {} as Response;

export const tokenStoreMock = new TokenStoreObj('mockAccess', 'mockRefresh');

export const userMock = {
  userId: 'mockID'
} as unknown as Selectable<CommerceUser>;

export const projectMock = {
  countries: ['BY', 'RU'],
  currencies: ['EU', 'RUB', 'USD']
} as Project;

export const appDataMock = (isUserLogged: boolean): AppData => ({
  countries: { BY: 'Belarus', RU: 'Russian Federation' },
  currencies: ['EU', 'RUB', 'USD'],
  isUserLogged
});
