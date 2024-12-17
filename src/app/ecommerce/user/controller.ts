import { api } from '@/services/api/v2/index.js';
import { BodyUserEmail } from '@/shared/zod/user.schema.js';
import { RequestHandler } from '@/shared/types/types.js';
import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';
import { getSessionTokenStore } from '@/shared/helpers/ecommerceSDK/get/getSessionTokenStore.js';

type GetUserByEmail = RequestHandler<boolean, BodyUserEmail>;

export const checkIsUserExistByEmail: GetUserByEmail = safeRequestHandler(async (req, res) => {
  const { email } = req.body;
  const tokenStore = getSessionTokenStore(req);
  const response = await api.user.getUserByEmail(tokenStore, email);
  res.status(200).send(!!response.count);
});
