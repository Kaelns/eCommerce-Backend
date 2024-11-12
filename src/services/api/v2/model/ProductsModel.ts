import { ApiRoot } from '@/services/api/v2/lib/ApiRoot.js';
import { LIMIT_ON_PAGE } from '@/services/api/v2/data/constants.js';
import { QueryProductsArgs } from '@/services/api/v2/data/types.js';
import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse
} from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/ts-client';

export class ProductsModel {
  public categories: Category[] = [];

  constructor(private apiRoot: ApiRoot) {}

  public async getProductByKey(tokenStore: TokenStore, key: string): Promise<ClientResponse<ProductProjection>> {
    return this.apiRoot.getApiRoot({ tokenStore }).productProjections().withKey({ key }).get().execute();
  }

  public async getProducts(tokenStore: TokenStore, queryArgs: QueryProductsArgs = {}): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    queryArgs.limit = 'limit' in queryArgs ? queryArgs.limit : LIMIT_ON_PAGE;
    return this.apiRoot.getApiRoot({ tokenStore }).productProjections().search().get({ queryArgs }).execute();
  }

  public async getCategories(tokenStore: TokenStore): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    return this.apiRoot.getApiRoot({ tokenStore }).categories().get().execute();
  }
}
