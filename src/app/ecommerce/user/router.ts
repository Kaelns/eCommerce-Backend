import express from 'express';
import { zodValidate } from '@/middlewares/zodValidate.js';
import { getUserByEmail /* , loginUser, logoutUser */ } from '@/app/ecommerce/user/controller.js';
import { bodyUserEmailSchema } from '@/shared/zod/user.schema.js';

const userRouter = express.Router();

// userRouter.route('/').post();
userRouter.route('/search').post(zodValidate(bodyUserEmailSchema), getUserByEmail);
// userRouter.route('/session').put(loginUser).delete(logoutUser);
// userRouter.route('/me').get().post().patch().delete();

export { userRouter };
