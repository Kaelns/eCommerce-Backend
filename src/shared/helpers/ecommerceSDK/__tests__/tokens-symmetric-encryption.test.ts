import { decryptTokens, encryptTokens } from '@/shared/helpers/ecommerceSDK/tokens-symmetric-encryption.js';

describe('Given encryptTokens/decryptTokens pair', () => {
  const initAccessToken = 'accessToken';
  const initRefreshToken = 'refreshToken';

  const encryptedTokens = encryptTokens(initAccessToken, initRefreshToken);
  const encryptedAccess = encryptedTokens.encryptedAccess;
  const encryptedRefresh = encryptedTokens.encryptedRefresh;

  test('returns initial data without distortion', () => {
    const { decryptedAccess, decryptedRefresh } = decryptTokens(encryptedAccess, encryptedRefresh);
    expect(decryptedAccess).toEqual(initAccessToken);
    expect(decryptedRefresh).toEqual(initRefreshToken);
  });
});
