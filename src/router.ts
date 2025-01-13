import express from 'express';
import { Routes } from '@/shared/data/enums.js';
import { userRouter } from '@/app/ecommerce/user/router.js';
import { projectRouter } from '@/app/ecommerce/auth/router.js';
import { productsRouter } from '@/app/ecommerce/products/router.js';
import { cartRouter } from '@/app/ecommerce/cart/router.js';

const router = express.Router();

router.use(Routes.AUTH, projectRouter);
router.use(Routes.CART, cartRouter);
router.use(Routes.USERS, userRouter);
router.use(Routes.PRODUCTS, productsRouter);

export { router };
