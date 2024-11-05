import { INIT_CART_DRAFT } from '@/services/api/v2/data/constants.js';
import { ApiClientType } from '@/services/api/v2/data/enums.js';
import { ApiClient } from '@/services/api/v2/lib/ApiClient.js';
import { MyCartDraft, Cart, MyCartUpdateAction, ClientResponse, CartPagedQueryResponse } from '@commercetools/platform-sdk';

export class CartModel {
  constructor(private apiClient: ApiClient) {}

  public async createCart(body: MyCartDraft = INIT_CART_DRAFT): Promise<ClientResponse<Cart>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().post({ body }).execute();
  }

  public async deleteCart(cartId: string, version: number): Promise<ClientResponse> {
    const deleteBody = { queryArgs: { version } };
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).carts().withId({ ID: cartId }).delete(deleteBody).execute();
  }

  public async getCart(): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
  }

  public async getCarts(): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
  }

  public async updateCart(cartId: string, version: number, actionObj: MyCartUpdateAction): Promise<ClientResponse<Cart>> {
    const postBody = { body: { version, actions: [actionObj] } };
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().withId({ ID: cartId }).post(postBody).execute();
  }
}
