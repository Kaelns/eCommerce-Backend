import { ApiRoot } from '@/services/api/v2/lib/ApiRoot.js';
import { MyCartDraft, Cart, MyCartUpdateAction, ClientResponse, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { INIT_CART_DRAFT } from '@/services/api/v2/data/constants.js';
import { TokenStore } from '@commercetools/ts-client';

export class CartModel {
  constructor(private apiRoot: ApiRoot) {}

  public async createCart(tokenStore: TokenStore, body: MyCartDraft = INIT_CART_DRAFT): Promise<ClientResponse<Cart>> {
    return this.apiRoot.getApiRoot({ tokenStore }).me().carts().post({ body }).execute();
  }

  public async deleteCart(tokenStore: TokenStore, cartId: string, version: number): Promise<ClientResponse> {
    const deleteBody = { queryArgs: { version } };
    return this.apiRoot.getApiRoot({ tokenStore }).carts().withId({ ID: cartId }).delete(deleteBody).execute();
  }

  public async getCart(tokenStore: TokenStore): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiRoot.getApiRoot({ tokenStore }).me().carts().get().execute();
  }

  public async getCarts(tokenStore: TokenStore): Promise<ClientResponse<CartPagedQueryResponse>> {
    return this.apiRoot.getApiRoot({ tokenStore }).me().carts().get().execute();
  }

  public async updateCart(tokenStore: TokenStore, cartId: string, version: number, actionObj: MyCartUpdateAction): Promise<ClientResponse<Cart>> {
    const postBody = { body: { version, actions: [actionObj] } };
    return this.apiRoot.getApiRoot({ tokenStore }).me().carts().withId({ ID: cartId }).post(postBody).execute();
  }
}
