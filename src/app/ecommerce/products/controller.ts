import { api } from '@/services/api/v2/index.js';
import { asyncHandler } from '@/middlewares/async-handlers.js';
import { RequestHandler } from 'express';
import { QueryArgsProducts } from '@/shared/zod/product.schema.js';
import { CategoryPagedQueryResponse, ClientResponse, ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

type GetProducts = RequestHandler<object, ClientResponse<ProductProjectionPagedSearchResponse>, undefined, QueryArgsProducts>;

export const getProducts: GetProducts = asyncHandler(async (req, res) => {
  const response = await api.products.getProducts(req.query);
  res.status(200).json(response);
});

type GetProductByKey = RequestHandler<{ key: string }, ClientResponse<ProductProjection>>;

export const getProductsByKey: GetProductByKey = asyncHandler(async (req, res) => {
  const response = await api.products.getProductByKey(req.params.key);
  res.status(200).json(response);
});

type GetCategories = RequestHandler<object, ClientResponse<CategoryPagedQueryResponse>>;

export const getCategories: GetCategories = asyncHandler(async (_, res) => {
  const response = await api.products.getCategories();
  res.status(200).json(response);
});
