import { Request } from 'express';
import { ApiRoot } from '@/services/ecommerce/v3/lib/ApiRoot.js';
import { Project } from '@commercetools/platform-sdk';
import { CartModel } from '@/services/ecommerce/v3/model/CartModel.js';
import { UserModel } from '@/services/ecommerce/v3/model/UserModel.js';
import { ProductsModel } from '@/services/ecommerce/v3/model/ProductsModel.js';
import { getAnonymCookieToTokenStore } from '@/shared/helpers/ecommerceSDK/get/getAnonymCookieToTokenStore.js';

export class Api {
  public user: UserModel;
  public cart: CartModel;
  public products: ProductsModel;
  private apiClient: ApiRoot;

  constructor() {
    this.apiClient = new ApiRoot();
    this.products = new ProductsModel(this.apiClient);
    this.cart = new CartModel(this.apiClient);
    this.user = new UserModel(this.apiClient, this.cart);
  }

  public async getProject(req: Request): Promise<Project> {
    const tokenStore = getAnonymCookieToTokenStore(req);
    const response = await this.apiClient.getApiRoot({ tokenStore }).get().execute();
    return response.body;
  }
}
