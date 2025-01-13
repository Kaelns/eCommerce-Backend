import { createCart, deleteCart, getAllCarts, getCartById, updateCart } from '@/app/ecommerce/cart/controller.js';
import { zodValidateQuery } from '@/middlewares/zod/zodValidateQuery.js';
import { queryArgsCardVersionSchema } from '@/shared/zod/cart.schema.js';
import express from 'express';

const cartRouter = express.Router();

cartRouter
  .route('/')
  .get(getAllCarts)
  .post(createCart)
  .patch(zodValidateQuery(queryArgsCardVersionSchema), updateCart)
  .delete(zodValidateQuery(queryArgsCardVersionSchema), deleteCart);
cartRouter.route('/:key').get(getCartById);

export { cartRouter };
