import { ApiClient } from '@/services/api/lib/ApiClient';
import { CartModel } from '@/services/api/model/CartModel';
import { ProductsModel } from '@/services/api/model/ProductsModel';
import { UserModel } from '@/services/api/model/UserModel';

export class Api {
  private apiClient: ApiClient;

  public user: UserModel;

  public products: ProductsModel;

  public cart: CartModel;

  constructor() {
    this.apiClient = new ApiClient();
    this.products = new ProductsModel(this.apiClient);
    this.cart = new CartModel(this.apiClient);
    this.user = new UserModel(this.apiClient);
  }
}
