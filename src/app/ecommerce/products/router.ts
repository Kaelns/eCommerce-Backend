import { getCategories, getProducts, getProductsByKey } from '@/app/ecommerce/products/controller.js';
import { convertReqQuery } from '@/app/ecommerce/products/helpers.js';
import { zodValidateQuery } from '@/middlewares/zod/zodValidateQuery.js';
import { queryArgsProductsSchema } from '@/shared/zod/product.schema.js';
import express from 'express';

const productsRouter = express.Router();

productsRouter.get('/', zodValidateQuery(queryArgsProductsSchema, convertReqQuery), getProducts);
productsRouter.get('/categories', getCategories);
productsRouter.get('/:key', getProductsByKey);

export { productsRouter };
