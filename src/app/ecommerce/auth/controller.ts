import { db } from '@/database/postgres/db.js';
import { api } from '@/services/ecommerce/v3/index.js';
import { doneHandler } from '@/shared/helpers/passport/doneHandler.js';
import { restoreUserFromDb } from '@/shared/helpers/userDB/restoreUserFromDb.js';
import { setIsLoggedCookie } from '@/shared/helpers/setIsLoggedCookie.js';
import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';
import { BodyUserCredentials } from '@/shared/zod/user.schema.js';
import { AppData, RequestHandler } from '@/shared/types/types.js';
import { responceNotOk, responceOk } from '@/shared/data/constants.js';
import { getAnonymCookieToTokenStore } from '@/shared/helpers/ecommerceSDK/get/getAnonymCookieToTokenStore.js';
import { insertOrUpdateUserDbThrowErr } from '@/shared/helpers/userDB/insertOrUpdateUserDbThrowErr.js';
import { createAnonymUserCookie, convertProjectData, restoreAnonymUser } from '@/app/ecommerce/auth/helpers.js';

type StartSession = RequestHandler<AppData>;

export const startSession: StartSession = safeRequestHandler(async (req, res) => {
  const isLogged = req.user ? await restoreUserFromDb(req.user) : false;
  const isAnonym = !isLogged ? await restoreAnonymUser(req, res) : false;

  const project = isLogged || isAnonym ? await api.getProject() : await createAnonymUserCookie(res);
  const appData = convertProjectData(project, isLogged);
  setIsLoggedCookie(res, isLogged);
  res.status(200).json(appData);
});

type SignUpUserPassport = RequestHandler<undefined, BodyUserCredentials>;

export const signUpUserPassport: SignUpUserPassport = safeRequestHandler(async (req, res, next) => {
  const userCredentials = req.body;
  const [cart, tokenStore] = await api.user.createUser(getAnonymCookieToTokenStore(req), userCredentials);
  const userDB = await insertOrUpdateUserDbThrowErr(userCredentials.email, tokenStore);
  setIsLoggedCookie(res, true);
  req.login(userDB, doneHandler(next, res, cart));
});

export const loginUserPassport: RequestHandler = safeRequestHandler(async (_req, res) => {
  setIsLoggedCookie(res, true);
  res.status(200).json(responceOk);
});

export const logoutUserPassport: RequestHandler = safeRequestHandler(async (req, res, next) => {
  if (req.user) {
    db.deleteFrom('commerceUser').where('userId', '=', req.user.userId).execute();
  }
  const isAnonymUserRestored = await restoreAnonymUser(req, res);
  if (!isAnonymUserRestored) {
    await createAnonymUserCookie(res);
  }
  setIsLoggedCookie(res, false);
  req.logout(doneHandler(next, res));
});

export const restoreUserWithRefreshToken: RequestHandler = safeRequestHandler(async (req, res, next) => {
  const isUserRefresh = req.user && req.user.refreshToken;
  const { refreshToken: isAnonymRefresh } = getAnonymCookieToTokenStore(req);

  if (req.user && isUserRefresh) {
    req.user.accessToken = '';
  }

  if (isUserRefresh || isAnonymRefresh) {
    await startSession(req, res, next);
    return;
  }

  res.status(200).json(responceNotOk);
});

export const checkLoginStatus: RequestHandler = safeRequestHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json(responceOk);
  }
  res.status(200).json(responceNotOk);
});
