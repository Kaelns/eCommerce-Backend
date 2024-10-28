import { INIT_CART_DRAFT } from '@/services/api/v2/data/constants';
import { ApiClientType } from '@/services/api/v2/data/enums';
import type { ApiClient } from '@/services/api/v2/lib/ApiClient';
import type { MyCartDraft, Cart, MyCartUpdateAction, ClientResponse, CartPagedQueryResponse } from '@commercetools/platform-sdk';

export class CartModel {
  constructor(private apiClient: ApiClient) {}

  public async createCart(body: MyCartDraft = INIT_CART_DRAFT): Promise<ClientResponse<Cart>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().post({ body }).execute();
  }

  public async deleteCart(cartId: string, version: number): Promise<ClientResponse> {
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

  public async getCart(): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
  }

  public async getCarts(): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiClient.getApiRoot(ApiClientType.TOKEN).me().carts().get().execute();
  }

  public async updateCart(cartId: string, version: number, actionObj: MyCartUpdateAction): Promise<ClientResponse<Cart>> {
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
