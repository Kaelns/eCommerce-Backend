import { api } from '@/services/api/v2/index.js';
import { RequestHandler } from '@/shared/types/types.js';
import { QueryArgsProducts } from '@/shared/zod/product.schema.js';
import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';
import { getSessionTokenStore } from '@/shared/helpers/ecommerceSDK/get/getSessionTokenStore.js';
import { CategoryPagedQueryResponse, ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

type GetProducts = RequestHandler<ProductProjectionPagedSearchResponse, undefined, QueryArgsProducts>;

export const getProducts: GetProducts = safeRequestHandler(async (req, res) => {
  const tokenStore = getSessionTokenStore(req);
  const products = await api.products.getProducts(tokenStore, req.query);
  res.status(200).json(products);
});

type GetProductByKey = RequestHandler<ProductProjection, undefined, Record<string, string>, { key: string }>;

export const getProductsByKey: GetProductByKey = safeRequestHandler(async (req, res) => {
  const tokenStore = getSessionTokenStore(req);
  const oneProduct = await api.products.getProductByKey(tokenStore, req.params.key);
  res.status(200).json(oneProduct);
});

type GetCategories = RequestHandler<CategoryPagedQueryResponse>;

export const getCategories: GetCategories = safeRequestHandler(async (req, res) => {
  const tokenStore = getSessionTokenStore(req);
  const categories = await api.products.getCategories(tokenStore);
  res.status(200).json(categories);
});
