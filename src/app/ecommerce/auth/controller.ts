import { db } from '@/database/postgres/db.js';
import { api } from '@/services/api/v2/index.js';
import { doneHandler } from '@/shared/helpers/passport/doneHandler.js';
import { restoreUserFromDb } from '@/shared/helpers/userDB/restoreUserFromDb.js';
import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';
import { BodyUserCredentials } from '@/shared/zod/user.schema.js';
import { AppData, RequestHandler } from '@/shared/types/types.js';
import { getAnonymCookieToTokenStore } from '@/shared/helpers/ecommerceSDK/get/getAnonymCookieToTokenStore.js';
import { insertOrUpdateUserDbThrowErr } from '@/shared/helpers/userDB/insertOrUpdateUserDbThrowErr.js';
import { createAnonymUserCookie, getAppData } from '@/app/ecommerce/auth/helpers.js';

type StartSession = RequestHandler<AppData>;

export const startSession: StartSession = safeRequestHandler(async (req, res) => {
  let isLogged = false;

  if (req.user) {
    isLogged = await restoreUserFromDb(req.user);
  }
  // TODO Restore anonym user

  const project = isLogged ? await api.getProject() : await createAnonymUserCookie(res);
  const appData = getAppData(project, isLogged);
  res.status(200).json(appData);
});

type SignUpUserPassport = RequestHandler<undefined, BodyUserCredentials>;

export const signUpUserPassport: SignUpUserPassport = safeRequestHandler(async (req, res, next) => {
  const userCredentials = req.body;
  const tokenStore = await api.user.createUser(getAnonymCookieToTokenStore(req), userCredentials);
  const userDB = await insertOrUpdateUserDbThrowErr(userCredentials.email, tokenStore);
  req.login(userDB, doneHandler(next, res));
});

export const loginUserPassport: RequestHandler = safeRequestHandler(async (_req, res) => {
  res.sendStatus(200);
});

export const logoutUserPassport: RequestHandler = safeRequestHandler(async (req, res, next) => {
  if (req.user) {
    db.deleteFrom('commerceUser').where('userId', '=', req.user.userId).execute();
  }
  await createAnonymUserCookie(res);
  req.logout(doneHandler(next, res));
});

export const checkLoginStatus: RequestHandler = safeRequestHandler(async (req, res) => {
  if (req.user) {
    res.sendStatus(200);
  }
  res.sendStatus(401);
});

// TODO Restore user endpoint
