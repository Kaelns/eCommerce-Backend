import { api } from '@/services/api/v2/index.js';
import { startSession } from '@/app/ecommerce/auth/controller.js';
import { AuthenticatedRequest } from '@/__tests__/__mocks__/types.js';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { appDataMock, projectMock, userMock } from '@/__tests__/__mocks__/express.mock.js';
import * as restoreUserFromDbModule from '@/shared/helpers/userDB/restoreUserFromDb.js';
import * as helpers from '@/app/ecommerce/auth/helpers.js';

jest.mock('@/services/api/v2/Api.js');

const createAnonymUserCookieMock = jest.spyOn(helpers, 'createAnonymUserCookie').mockImplementation(async () => projectMock);

describe('startSession express handler', () => {
  const { res: resMock, next, clearMockRes } = getMockRes();

  const getProjectMock = jest.spyOn(api, 'getProject').mockImplementation(async () => projectMock);
  const restoreUserFromDbMock = jest.spyOn(restoreUserFromDbModule, 'restoreUserFromDb').mockImplementation(async () => true);
  const restoreAnonymUserMock = jest.spyOn(helpers, 'restoreAnonymUser').mockImplementation(async () => true);

  beforeEach(() => {
    jest.clearAllMocks();
    clearMockRes();
  });

  it('handle session req.user = undefined (user is not logged)', async () => {
    const reqWithoutUserMock = getMockReq();

    await startSession(reqWithoutUserMock, resMock, next);

    expect(restoreUserFromDbMock).not.toHaveBeenCalled();
    expect(restoreAnonymUserMock).toHaveBeenCalled();
    expect(getProjectMock).toHaveBeenCalled();
    expect(createAnonymUserCookieMock).not.toHaveBeenCalled();
    expect(resMock.json).toHaveBeenCalledWith(appDataMock(false));
  });

  it('handle session req.user != undefined (user is logged)', async () => {
    const reqUserMock = getMockReq<AuthenticatedRequest>({ user: userMock });

    await startSession(reqUserMock, resMock, next);

    expect(restoreUserFromDbMock).toHaveBeenCalled();
    expect(restoreAnonymUserMock).not.toHaveBeenCalled();
    expect(getProjectMock).toHaveBeenCalled();
    expect(createAnonymUserCookieMock).not.toHaveBeenCalled();
    expect(resMock.json).toHaveBeenCalledWith(appDataMock(true));
  });

  it("create new anonym when user = undefined and anonym can't be restored", async () => {
    const reqWithoutUserMock = getMockReq();
    restoreAnonymUserMock.mockImplementation(async () => false);

    await startSession(reqWithoutUserMock, resMock, next);

    expect(restoreUserFromDbMock).not.toHaveBeenCalled();
    expect(restoreAnonymUserMock).toHaveBeenCalled();
    expect(getProjectMock).not.toHaveBeenCalled();
    expect(createAnonymUserCookieMock).toHaveBeenCalled();
    expect(resMock.json).toHaveBeenCalledWith(appDataMock(false));
  });
});
