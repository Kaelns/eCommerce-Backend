import { api } from '@/services/api/v2/index.js';
import { IProductsQueryArgs } from '@/shared/zodShema.js';
import { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { RequestHandler } from 'express';

export const getProducts: RequestHandler<object, ClientResponse<ProductProjectionPagedSearchResponse>, undefined, IProductsQueryArgs> = async (
  req,
  res
) => {
  const response = await api.products.getProducts(req.query);
  res.status(200).json(response);
};
