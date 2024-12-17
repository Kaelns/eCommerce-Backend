import { ApiRoot } from '@/services/api/v2/lib/ApiRoot.js';
import { CartModel } from '@/services/api/v2/model/CartModel.js';
import { ApiRootType } from '@/services/api/v2/data/enums.js';
import { TokenStoreObj } from '@/services/api/v2/lib/TokenStore.js';
import { omitUndefinedProps } from '@/utils/omitUndefinedProps.js';
import { checkTokenStoreThrowErr } from '@/services/api/v2/utils/checkTokenStoreThrowErr.js';
import { TokenStore, UserAuthOptions } from '@commercetools/ts-client';
import { ResponseWithTokens, UserCredentials } from '@/services/api/v2/data/types.js';
import { Project, Customer, ClientResponse, MyCustomerUpdate, CustomerSignInResult, CustomerPagedQueryResponse } from '@commercetools/platform-sdk';

export class UserModel {
  constructor(private apiRoot: ApiRoot, private cart: CartModel) {}

  public async createAnonymousUser(): Promise<ResponseWithTokens<Project>> {
    const response: ClientResponse<Project> = await this.apiRoot.getApiRoot({ type: ApiRootType.ANONYM }).get().execute();
    const tokenStore = checkTokenStoreThrowErr(response.tokenStore);
    // TODO create cart here or only only when we'll work with it
    // await this.cart.createCart(tokenStore);
    return [response.body, tokenStore];
  }

  public async createUser(anonymTokenStore: TokenStore, params: UserCredentials): Promise<TokenStore> {
    const response: ClientResponse<CustomerSignInResult> = await this.apiRoot
      .getApiRoot({ type: ApiRootType.ANONYM, tokenStore: anonymTokenStore })
      .customers()
      .post({ body: omitUndefinedProps(params) })
      .execute();
    const tokenStore = checkTokenStoreThrowErr(response.tokenStore);
    if (!response.body.cart) {
      // TODO return cart id
      /* const cart = */ await this.cart.createCart(tokenStore);
    }
    return tokenStore;
  }

  public async loginUser(anonymTokenStore: TokenStore, user: UserAuthOptions): Promise<TokenStore> {
    const postBody = { body: { email: user.username, password: user.password, activeCartSignInMode: 'MergeWithExistingCustomerCart' } };
    const response: ClientResponse<CustomerSignInResult> = await this.apiRoot
      .getApiRoot({ type: ApiRootType.USER, user, tokenStore: anonymTokenStore })
      .me()
      .login()
      .post(postBody)
      .execute();
    const tokenStore = checkTokenStoreThrowErr(response.tokenStore);
    return tokenStore;
  }

  public async restoreLoggedUser(refreshToken: string): Promise<TokenStore> {
    const tokenStore = new TokenStoreObj('', refreshToken);
    const response: ClientResponse = await this.apiRoot.getApiRoot({ type: ApiRootType.REFRESH_TOKEN, tokenStore }).get().execute();
    const newTokenStore = checkTokenStoreThrowErr(response.tokenStore);
    return newTokenStore;
  }

  public async getUserByEmail(tokenStore: TokenStore, email: string): Promise<CustomerPagedQueryResponse> {
    const getBody = { queryArgs: { where: `email="${email}"`, withTotal: false } };
    const response = await this.apiRoot.getApiRoot({ tokenStore }).customers().get(getBody).execute();
    return response.body;
  }

  public async getLoggedUser(tokenStore: TokenStore): Promise<ClientResponse<Customer>> {
    return this.apiRoot.getApiRoot({ tokenStore }).me().get().execute();
  }

  public async updateLoggedUserData(tokenStore: TokenStore, body: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    return this.apiRoot.getApiRoot({ tokenStore }).me().post({ body }).execute();
  }

  /* async updateUserPassword(body: MyCustomerChangePassword, email: string, newPassword: string): Promise<void> {
    await this.apiClient.getApiRootToken().me().password().post({ body }).execute();
    // TODO Check this part
    await this.logoutUser();
    await this.loginUser(email, newPassword);
  } */
}
