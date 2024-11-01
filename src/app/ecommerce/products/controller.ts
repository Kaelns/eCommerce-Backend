import { api } from '@/services/api/v2/index.js';
import { IProductsQueryArgs } from '@/shared/zodSchema.js';
import { CategoryPagedQueryResponse, ClientResponse, ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { RequestHandler } from 'express';

type GetProducts = RequestHandler<object, ClientResponse<ProductProjectionPagedSearchResponse>, undefined, IProductsQueryArgs>;

export const getProducts: GetProducts = async (req, res, next) => {
  try {
    const response = await api.products.getProducts(req.query);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

type GetProductByKey = RequestHandler<{ key: string }, ClientResponse<ProductProjection>>;

export const getProductsByKey: GetProductByKey = async (req, res, next) => {
  try {
    const response = await api.products.getProductByKey(req.params.key);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

type GetCategories = RequestHandler<object, ClientResponse<CategoryPagedQueryResponse>>;

export const getCategories: GetCategories = async (_, res, next) => {
  try {
    const response = await api.products.getCategories();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
