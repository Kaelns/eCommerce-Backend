import { decryptTokens, encryptTokens } from '@/shared/helpers/ecommerceSDK/tokens-symmetric-encryption.js';

jest.mock<typeof import('@/shared/config/envConfig.js')>('@/shared/config/envConfig.js', () => {
  const originalEnvConfigModule = jest.requireActual<typeof import('@/shared/config/envConfig.js')>('@/shared/config/envConfig.js');
  return {
    ...originalEnvConfigModule,
    ENV_ENCRYPTION_KEY_HEX: 'd970ae075cd4ecf5a1258279db5b0254954045cdcd1bff1683e3680705c31264'
  };
});

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
