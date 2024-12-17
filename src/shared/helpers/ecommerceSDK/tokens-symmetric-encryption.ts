import { encryptData } from '@/utils/symmetric-encryption.js';
import { decryptData } from '@/utils/symmetric-encryption.js';
import { ENV_ENCRYPTION_KEY_HEX } from '@/shared/config/envConfig.js';

export function decryptTokens(encryptedAccess: string, encryptedRefresh: string | undefined) {
  const decryptedAccess = decryptData(ENV_ENCRYPTION_KEY_HEX, encryptedAccess);
  const decryptedRefresh = decryptData(ENV_ENCRYPTION_KEY_HEX, encryptedRefresh);
  return { decryptedAccess, decryptedRefresh };
}

export function encryptTokens(accessToken: string, refreshToken: string | undefined) {
  const encryptedAccess = encryptData(ENV_ENCRYPTION_KEY_HEX, accessToken);
  const encryptedRefresh = encryptData(ENV_ENCRYPTION_KEY_HEX, refreshToken);
  return { encryptedAccess, encryptedRefresh };
}
