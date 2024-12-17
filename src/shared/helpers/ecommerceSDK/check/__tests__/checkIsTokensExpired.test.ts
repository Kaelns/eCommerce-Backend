import { checkIsTokensExpired } from '@/shared/helpers/ecommerceSDK/check/checkIsTokensExpired.js';
import dayjs from 'dayjs';

const accessToken = 'accessToken';
const refreshToken = 'refreshToken';
const expiresAfter = '2d:10d';

describe('Given checkIsTokensExpired type guard', () => {
  test('return false isExpiredAccess and false isExpiredRefresh on if there is still time left', () => {
    const updatedAt = dayjs().subtract(1, 'day').toString();
    const { isExpiredAccess, isExpiredRefresh } = checkIsTokensExpired({ accessToken, refreshToken, updatedAt, expiresAfter });
    expect(isExpiredAccess).toBeFalsy();
    expect(isExpiredRefresh).toBeFalsy();
  });

  test('return true isExpiredAccess on expired date and false isExpiredRefresh', () => {
    const updatedAt = dayjs().subtract(3, 'day').toString();
    const { isExpiredAccess, isExpiredRefresh } = checkIsTokensExpired({ accessToken, refreshToken, updatedAt, expiresAfter });
    expect(isExpiredAccess).toBeTruthy();
    expect(isExpiredRefresh).toBeFalsy();
  });

  test('return true isExpiredRefresh on expired date', () => {
    const updatedAt = dayjs().subtract(11, 'day').toString();
    const { isExpiredRefresh } = checkIsTokensExpired({ accessToken: '', refreshToken, updatedAt, expiresAfter });
    expect(isExpiredRefresh).toBeTruthy();
  });

  test('return true isExpiredAccess and isExpiredRefresh if accessToken and refresh tokens are empty but there is still time left', () => {
    const updatedAt = dayjs().subtract(1, 'day').toString();
    const { isExpiredAccess, isExpiredRefresh } = checkIsTokensExpired({ accessToken: '', refreshToken: '', updatedAt, expiresAfter });
    expect(isExpiredAccess).toBeTruthy();
    expect(isExpiredRefresh).toBeTruthy();
  });
});
