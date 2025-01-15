import express from 'express';
import { zodValidate } from '@/middlewares/zod/zodValidate.js';
import { createCart, deleteCart, getAllCarts, getCartById, updateCart } from '@/app/ecommerce/cart/controller.js';
import { deleteCartBodySchema, getCartByIdBodySchema, updateCartBodySchema } from '@/shared/zod/cart.schema.js';

const cartRouter = express.Router();

cartRouter
  .route('/')
  .get(getAllCarts)
  .post(createCart)
  .patch(zodValidate(updateCartBodySchema), updateCart)
  .delete(zodValidate(deleteCartBodySchema), deleteCart);

cartRouter.route('/id').get(zodValidate(getCartByIdBodySchema), getCartById);

export { cartRouter };
