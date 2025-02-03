import {
  startSession,
  checkLoginStatus,
  loginUserPassport,
  logoutUserPassport,
  signUpUserPassport,
  restoreUserWithRefreshToken
} from '@/app/ecommerce/auth/controller.js';
import { zodValidate } from '@/middlewares/zod/zodValidate.js';
import { bodyUserCredentialsSchema, bodyUserLoginSchema } from '@/shared/zod/user.schema.js';
import express from 'express';
import passport from 'passport';

const projectRouter = express.Router();

projectRouter.get('/', startSession);
projectRouter
  .route('/session')
  .get(checkLoginStatus)
  .post(zodValidate(bodyUserCredentialsSchema), signUpUserPassport)
  .put(zodValidate(bodyUserLoginSchema), passport.authenticate('local'), loginUserPassport)
  .patch(restoreUserWithRefreshToken)
  .delete(logoutUserPassport);

export { projectRouter };
