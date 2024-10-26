import { INIT_CART_DRAFT } from '@/services/api/v2/data/constants';
import { ApiClientType } from '@/services/api/v2/data/types';
import { ApiClient } from '@/services/api/v2/lib/ApiClient';
import {
  MyCartDraft,
  Cart,
  MyCartUpdateAction,
  ClientResponse,
  CartPagedQueryResponse
} from '@commercetools/platform-sdk';

export class CartModel {
  constructor(private apiClient: ApiClient) {}

  async createCart(body: MyCartDraft = INIT_CART_DRAFT): Promise<ClientResponse<Cart>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().post({ body }).execute();
  }

  async deleteCart(cartId: string, version: number): Promise<ClientResponse> {
    return this.apiClient
      .getApiRoot(ApiClientType.TOKEN)
      .carts()
      .withId({ ID: cartId })
      .delete({
        queryArgs: {
          version
        }
      })
      .execute();
  }

  async getCart(): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
  }

  async getCarts(): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
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
