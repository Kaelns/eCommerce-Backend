import { LIMIT_ON_PAGE } from '@/services/api/data/constants';
import { IQueryProductsArgs } from '@/services/api/data/types';
import { ApiClient } from '@/services/api/lib/ApiClient';
import {
  Category,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse
} from '@commercetools/platform-sdk';


export class ProductsModel {
  public categories: Category[] = [];

  constructor(private apiClient: ApiClient) {}

  async getProductByKey(key: string): Promise<ClientResponse<ProductProjection>> {
    return this.apiClient.getApiRoot().productProjections().withKey({ key }).get().execute();
  }

  async getProducts(
    parameters: IQueryProductsArgs,
    amount?: number
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    const queryArgs: IQueryProductsArgs = parameters;
    queryArgs.limit = !amount ? LIMIT_ON_PAGE : amount;
    return this.apiClient.getApiRoot().productProjections().search().get({ queryArgs }).execute();
  }

  async getProductsAll(): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this.apiClient.getApiRoot().productProjections().search().get().execute();
  }

  async getCategoriesAll(): Promise<Category[]> {
    const { body } = await this.apiClient.getApiRoot().categories().get().execute();
    this.categories = body.results;
    return body.results;
  }
}
