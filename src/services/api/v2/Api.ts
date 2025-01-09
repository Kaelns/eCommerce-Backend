import { ApiRoot } from '@/services/api/v2/lib/ApiRoot.js';
import { Project } from '@commercetools/platform-sdk';
import { CartModel } from '@/services/api/v2/model/CartModel.js';
import { UserModel } from '@/services/api/v2/model/UserModel.js';
import { ProductsModel } from '@/services/api/v2/model/ProductsModel.js';

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

  public async getProject(): Promise<Project> {
    const response = await this.apiClient.getDefaultApiRoot().get().execute();
    return response.body;
  }
}
