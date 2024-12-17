import passport from 'passport';
import { db } from '@/database/postgres/db.js';
import { api } from '@/services/api/v2/index.js';
import { Errors } from '@/shared/data/enums.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Selectable } from 'kysely';
import { CommerceUser } from '@/database/postgres/types.js';
import { UserAuthOptions } from '@commercetools/ts-client';
import { decryptTokens } from '@/shared/helpers/ecommerceSDK/tokens-symmetric-encryption.js';
import { getAnonymCookieToTokenStore } from '@/shared/helpers/ecommerceSDK/get/getAnonymCookieToTokenStore.js';
import { insertOrUpdateUserDbThrowErr } from '@/shared/helpers/userDB/insertOrUpdateUserDbThrowErr.js';

passport.serializeUser((user, done) => {
  process.nextTick(function () {
    done(null, (user as Selectable<CommerceUser>).userId);
  });
});

passport.deserializeUser((userID: number, done) => {
  process.nextTick(async () => {
    const userDB = await db.selectFrom('commerceUser').selectAll().where('userId', '=', userID).executeTakeFirst();
    if (userDB) {
      const { decryptedAccess, decryptedRefresh } = decryptTokens(userDB.accessToken, userDB.refreshToken);
      userDB.accessToken = decryptedAccess;
      userDB.refreshToken = decryptedRefresh;
      done(null, userDB);
    } else {
      done(new Error(Errors.UNDEFINED_USER_DB + ' inside deserialize function'));
    }
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      const user: UserAuthOptions = { username: email, password };
      const anonymTokenStore = getAnonymCookieToTokenStore(req);

      // TODO Do we need to check is user registered

      const tokenStore = await api.user.loginUser(anonymTokenStore, user);
      const userDB = await insertOrUpdateUserDbThrowErr(email, tokenStore);

      done(null, userDB);
    } catch (error) {
      done(error);
    }
  })
);
