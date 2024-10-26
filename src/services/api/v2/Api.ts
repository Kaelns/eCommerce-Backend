import { ApiClient } from '@/services/api/v2/lib/ApiClient';
import { CartModel } from '@/services/api/v2/model/CartModel';
import { ProductsModel } from '@/services/api/v2/model/ProductsModel';
import { UserModel } from '@/services/api/v2/model/UserModel';

export class Api {
  public user: UserModel;
  public cart: CartModel;
  public products: ProductsModel;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
    this.products = new ProductsModel(this.apiClient);
    this.cart = new CartModel(this.apiClient);
    this.user = new UserModel(this.apiClient);
  }
}
