import express from 'express';
import { zodValidate } from '@/middlewares/zod/zodValidate.js';
import { checkIsUserExistByEmail } from '@/app/ecommerce/user/controller.js';
import { bodyUserEmailSchema } from '@/shared/zod/user.schema.js';

const userRouter = express.Router();

userRouter.route('/search').post(zodValidate(bodyUserEmailSchema), checkIsUserExistByEmail);
// userRouter.route('/me').get().post().patch().delete();

export { userRouter };
