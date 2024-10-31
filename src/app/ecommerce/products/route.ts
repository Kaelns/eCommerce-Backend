import { getProducts } from '@/app/ecommerce/products/controller.js';
import { convertReqQuery } from '@/app/ecommerce/products/helpers.js';
import { zodValidateQuery } from '@/middlewares/zodValidateQuery.js';
import { ProductsQueryArgs } from '@/shared/zodShema.js';
import express from 'express';

const productsRouter = express.Router();

productsRouter.get('/', zodValidateQuery(ProductsQueryArgs, convertReqQuery), getProducts);
productsRouter.get('/categories');
productsRouter.get('/:id');

export { productsRouter };
