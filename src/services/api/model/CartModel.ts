import { ApiClientType } from '@/services/api/data/types';
import { ApiClient } from '@/services/api/lib/ApiClient';
import { MyCartDraft, Cart, MyCartUpdateAction, ClientResponse } from '@commercetools/platform-sdk';

// TODO Change cartDraft
const INIT_CART_DRAFT = {
  currency: 'USD',
  country: 'US'
};

export class CartModel {
  constructor(private apiClient: ApiClient) {}

  async createCart(cartDraft: MyCartDraft = INIT_CART_DRAFT): Promise<Cart> {
    const responce = await this.apiClient
      .getApiRoot(ApiClientType.TOKEN)
      .me()
      .carts()
      .post({ body: cartDraft })
      .execute();
    return responce.body;
  }

  async deleteCart(cartId: string, cartVersion: number): Promise<ClientResponse> {
    return this.apiClient
      .getApiRoot(ApiClientType.TOKEN)
      .carts()
      .withId({ ID: cartId })
      .delete({
        queryArgs: {
          version: cartVersion
        }
      })
      .execute();
  }

  async getCart(): Promise<Cart | null> {
    const responce = await this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
    return responce.body.results[0];
  }

  async getCarts(): Promise<Cart[]> {
    const responce = await this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
    return responce.body.results;
  }

  async updateCart(cartId: string, version: number, actionObj: MyCartUpdateAction): Promise<ClientResponse<Cart>> {
    return this.apiClient
      .getApiRoot(ApiClientType.TOKEN)
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [actionObj]
        }
      })
      .execute();
  }
}
