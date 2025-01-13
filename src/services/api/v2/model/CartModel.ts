import { ApiRoot } from '@/services/api/v2/lib/ApiRoot.js';
import { TokenStore } from '@commercetools/ts-client';
import { INIT_CART_DRAFT } from '@/services/api/v2/data/constants.js';
import { MyCartDraft, Cart, MyCartUpdateAction, CartPagedQueryResponse } from '@commercetools/platform-sdk';

export class CartModel {
  constructor(private apiRoot: ApiRoot) {}

  public async createCart(tokenStore: TokenStore, body: MyCartDraft = INIT_CART_DRAFT): Promise<Cart> {
    const response = await this.apiRoot.getApiRoot({ tokenStore }).me().carts().post({ body }).execute();
    return response.body;
  }

  public async getCartWithId(tokenStore: TokenStore, cartId: string): Promise<Cart> {
    const response = await this.apiRoot.getApiRoot({ tokenStore }).me().carts().withId({ ID: cartId }).get().execute();
    return response.body;
  }

  public async getAllCarts(tokenStore: TokenStore): Promise<CartPagedQueryResponse> {
    const response = await this.apiRoot.getApiRoot({ tokenStore }).me().carts().get().execute();
    return response.body;
  }

  public async updateCart(tokenStore: TokenStore, cartId: string, version: number, actionObj: MyCartUpdateAction): Promise<Cart> {
    const postBody = { body: { version, actions: [actionObj] } };
    const response = await this.apiRoot.getApiRoot({ tokenStore }).me().carts().withId({ ID: cartId }).post(postBody).execute();
    return response.body;
  }

  public async deleteCart(tokenStore: TokenStore, cartId: string, version: number): Promise<void> {
    const deleteBody = { queryArgs: { version } };
    await this.apiRoot.getApiRoot({ tokenStore }).carts().withId({ ID: cartId }).delete(deleteBody).execute();
  }
}
