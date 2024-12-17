import { db } from '@/database/postgres/db.js';
import { Errors } from '@/shared/data/enums.js';
import { Selectable } from 'kysely';
import { TokenStore } from '@commercetools/ts-client';
import { CommerceUser } from '@/database/postgres/types.js';
import { encryptTokens } from '@/shared/helpers/ecommerceSDK/tokens-symmetric-encryption.js';

export async function insertOrUpdateUserDbThrowErr(email: string, tokenStore: TokenStore): Promise<Selectable<CommerceUser>> {
  const { token: accessToken, refreshToken } = tokenStore;
  const { encryptedAccess, encryptedRefresh } = encryptTokens(accessToken, refreshToken);
  const userObjToDb = {
    email,
    accessToken: encryptedAccess,
    refreshToken: encryptedRefresh
  };

  const userDB: Selectable<CommerceUser> | undefined = await db
    .insertInto('commerceUser')
    .values(userObjToDb)
    .onConflict((oc) => oc.column('email').doUpdateSet(userObjToDb))
    .returningAll()
    .executeTakeFirst();

  if (!userDB) {
    throw new Error(Errors.UNDEFINED_USER_DB + 'inside local strategy function');
  }

  return userDB;
}
