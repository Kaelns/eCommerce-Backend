import { ApiClient } from '@/services/api/v2/lib/ApiClient.js';
import { LIMIT_ON_PAGE } from '@/services/api/v2/data/constants.js';
import { QueryProductsArgs } from '@/services/api/v2/data/types.js';
import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse
} from '@commercetools/platform-sdk';

export class ProductsModel {
  public categories: Category[] = [];

  constructor(private apiClient: ApiClient) {}

  public async getProductByKey(key: string): Promise<ClientResponse<ProductProjection>> {
    return this.apiClient.getDefaultApiRoot().productProjections().withKey({ key }).get().execute();
  }

  public async getProducts(queryArgs: QueryProductsArgs = {}): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    queryArgs.limit = 'limit' in queryArgs ? queryArgs.limit : LIMIT_ON_PAGE;
    return this.apiClient.getDefaultApiRoot().productProjections().search().get({ queryArgs }).execute();
  }

  public async getCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    return this.apiClient.getDefaultApiRoot().categories().get().execute();
  }
}
