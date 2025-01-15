import { Cart, CartPagedQueryResponse } from '@commercetools/platform-sdk';

export const createCartPagedQueryResponse = (carts: Cart[]): CartPagedQueryResponse => {
  return {
    limit: 20, // * default value according to getAllCarts api response
    offset: 0,
    count: carts.length,
    results: carts
  };
};
