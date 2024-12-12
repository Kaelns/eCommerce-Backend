import express from 'express';
import { zodValidate } from '@/middlewares/zod/zodValidate.js';
import { createUser, getUserByEmail, loginUser, logoutUser } from '@/app/ecommerce/user/controller.js';
import { bodyUserCredentialsSchema, bodyUserEmailSchema } from '@/shared/zod/user.schema.js';

const userRouter = express.Router();

userRouter.route('/').post(zodValidate(bodyUserCredentialsSchema), createUser);
userRouter.route('/search').post(zodValidate(bodyUserEmailSchema), getUserByEmail);
userRouter.route('/session').put(loginUser).delete(logoutUser);
// userRouter.route('/me').get().post().patch().delete();

export { userRouter };
