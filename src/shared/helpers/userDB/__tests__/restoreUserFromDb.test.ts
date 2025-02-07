import { api } from '@/services/ecommerce/v3/index.js';
import { Kysely, Selectable } from 'kysely';
import { CommerceUser, DB } from '@/database/postgres/types.js';
import { tokenStoreMock } from '@/__tests__/__mocks__/express.mock.js';
import { restoreUserFromDb } from '@/shared/helpers/userDB/restoreUserFromDb.js';
import * as checkIsTokensExpiredModule from '@/shared/helpers/ecommerceSDK/check/checkIsTokensExpired.js';
import * as tokensSymmetricEncryptionModule from '@/shared/helpers/ecommerceSDK/tokens-symmetric-encryption.js';
import { AuthenticatedRequest } from '@/__tests__/__mocks__/types.js';
import { getMockReq } from '@jest-mock/express';

jest.mock('@/services/ecommerce/v3/index.js');
jest.mock('pg');
jest.mock('@/database/postgres/db.js', () => {
  const methodsMock = {
    updateTable: jest.fn(() => methodsMock),
    set: jest.fn(() => methodsMock),
    where: jest.fn(() => methodsMock),
    execute: jest.fn(() => methodsMock)
  } as unknown as Kysely<DB>;

  return {
    db: methodsMock
  };
});

describe('restoreUserFromDb function', () => {
  let reqUserMock: AuthenticatedRequest;
  const checkIsTokensExpiredMock = jest.spyOn(checkIsTokensExpiredModule, 'checkIsTokensExpired');
  const restoreTokensMock = jest.spyOn(api.user, 'restoreTokens').mockImplementation(async () => tokenStoreMock);
  const encryptTokensMock = jest.spyOn(tokensSymmetricEncryptionModule, 'encryptTokens').mockImplementation(() => ({
    encryptedAccess: 'encryptedAccess',
    encryptedRefresh: 'encryptedRefresh'
  }));

  const userMock = { userId: 'mockId', accessToken: '', refreshToken: 'mockRefreshInit' } as unknown as Selectable<CommerceUser>;

  beforeEach(() => {
    jest.clearAllMocks();
    reqUserMock = getMockReq<AuthenticatedRequest>({ user: { ...userMock } });
    checkIsTokensExpiredMock.mockReset();
  });

  it('return false if all tokens are expired', async () => {
    checkIsTokensExpiredMock.mockImplementation(() => ({
      isExpiredAccess: true,
      isExpiredRefresh: true
    }));

    const result = await restoreUserFromDb(reqUserMock);

    expect(restoreTokensMock).not.toHaveBeenCalled();
    expect(encryptTokensMock).not.toHaveBeenCalled();
    expect(result).toBeFalsy();
  });

  it('return true if access - not expired, refresh - not expired', async () => {
    checkIsTokensExpiredMock.mockImplementation(() => ({
      isExpiredAccess: false,
      isExpiredRefresh: false
    }));

    const result = await restoreUserFromDb(reqUserMock);

    expect(restoreTokensMock).not.toHaveBeenCalled();
    expect(encryptTokensMock).not.toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it("return true if access token - not expired, and don't react on expired refresh", async () => {
    checkIsTokensExpiredMock.mockImplementation(() => ({
      isExpiredAccess: false,
      isExpiredRefresh: true
    }));

    const result = await restoreUserFromDb(reqUserMock);

    expect(restoreTokensMock).not.toHaveBeenCalled();
    expect(encryptTokensMock).not.toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it('return true after restoring tokens (access - expired, refresh - not)', async () => {
    checkIsTokensExpiredMock.mockImplementation(() => ({
      isExpiredAccess: true,
      isExpiredRefresh: false
    }));

    const result = await restoreUserFromDb(reqUserMock);

    expect(restoreTokensMock).toHaveBeenCalled();
    expect(encryptTokensMock).toHaveBeenCalled();
    expect(result).toBeTruthy();
    // * Sets new tokens from restoreTokensMock
    expect(reqUserMock.user.accessToken).toEqual(tokenStoreMock.token);
    expect(reqUserMock.user.refreshToken).toEqual(tokenStoreMock.refreshToken);
  });
});
