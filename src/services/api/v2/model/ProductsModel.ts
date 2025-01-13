import { ApiRoot } from '@/services/api/v2/lib/ApiRoot.js';
import { PRODUCTS_LIMIT_ON_PAGE } from '@/services/api/v2/data/constants.js';
import { QueryProductsArgs } from '@/services/api/v2/data/types.js';
import { Category, ProductProjection, CategoryPagedQueryResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/ts-client';

export class ProductsModel {
  public categories: Category[] = [];

  constructor(private apiRoot: ApiRoot) {}

  public async getProductByKey(tokenStore: TokenStore, key: string): Promise<ProductProjection> {
    const response = await this.apiRoot.getApiRoot({ tokenStore }).productProjections().withKey({ key }).get().execute();
    return response.body;
  }

  public async getProducts(tokenStore: TokenStore, queryArgs: QueryProductsArgs = {}): Promise<ProductProjectionPagedSearchResponse> {
    queryArgs.limit = 'limit' in queryArgs ? queryArgs.limit : PRODUCTS_LIMIT_ON_PAGE;
    const response = await this.apiRoot.getApiRoot({ tokenStore }).productProjections().search().get({ queryArgs }).execute();
    return response.body;
  }

  public async getCategories(tokenStore: TokenStore): Promise<CategoryPagedQueryResponse> {
    const response = await this.apiRoot.getApiRoot({ tokenStore }).categories().get().execute();
    return response.body;
  }
}
