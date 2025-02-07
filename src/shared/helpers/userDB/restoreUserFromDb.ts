import { db } from '@/database/postgres/db.js';
import { api } from '@/services/ecommerce/v3/index.js';
import { Selectable } from 'kysely';
import { CommerceUser } from '@/database/postgres/types.js';
import { encryptTokens } from '@/shared/helpers/ecommerceSDK/tokens-symmetric-encryption.js';
import { checkIsTokensExpired } from '@/shared/helpers/ecommerceSDK/check/checkIsTokensExpired.js';
import { Request } from 'express';

export async function restoreUserFromDb(req: Request): Promise<boolean> {
  try {
    const user = req.user as Selectable<CommerceUser>;
    const { userId, refreshToken } = user;
    const { isExpiredAccess, isExpiredRefresh } = checkIsTokensExpired(user);

    if (!isExpiredAccess) {
      return true;
    }

    if (isExpiredAccess && !isExpiredRefresh && refreshToken) {
      const newTokenStore = await api.user.restoreTokens(refreshToken);

      user.accessToken = newTokenStore.token;
      user.refreshToken = newTokenStore.refreshToken ?? '';

      const { encryptedAccess, encryptedRefresh } = encryptTokens(newTokenStore.token, newTokenStore.refreshToken);

      db.updateTable('commerceUser')
        .set({
          accessToken: encryptedAccess,
          refreshToken: encryptedRefresh
        })
        .where('userId', '=', userId)
        .execute();
      return true;
    }
  } catch (error) {
    console.warn(error);
  }
  return false;
}
