import { db } from '@/database/postgres/db.js';
import { api } from '@/services/api/v2/index.js';
import { Selectable } from 'kysely';
import { CommerceUser } from '@/database/postgres/types.js';
import { encryptTokens } from '@/shared/helpers/ecommerceSDK/tokens-symmetric-encryption.js';
import { checkIsTokensExpired } from '@/shared/helpers/ecommerceSDK/check/checkIsTokensExpired.js';

export async function restoreUserFromDb(user: Selectable<CommerceUser>): Promise<boolean> {
  try {
    const { userId, refreshToken } = user;
    const { isExpiredAccess, isExpiredRefresh } = checkIsTokensExpired(user);

    if (!isExpiredAccess) {
      // FIXME Does it need checking
      // await api.user.getLoggedUser(new TokenStoreObj(accessToken, refreshToken))
      return true;
    }

    if (isExpiredAccess && !isExpiredRefresh && refreshToken) {
      const newTokenStore = await api.user.restoreLoggedUser(refreshToken);
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
