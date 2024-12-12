import { ApiRoot } from '@/services/api/v2/lib/ApiRoot.js';
import { CartModel } from '@/services/api/v2/model/CartModel.js';
import { UserCredentials } from '@/services/api/v2/data/types.js';
import { TokenStore, UserAuthOptions } from '@commercetools/ts-client';
import { APIErrors, ApiRootType } from '@/services/api/v2/data/enums.js';
import { omitUndefinedProps } from '@/utils/omitUndefinedProps.js';
import { Project, Customer, ClientResponse, MyCustomerUpdate, CustomerSignInResult, CustomerPagedQueryResponse } from '@commercetools/platform-sdk';

export class UserModel {
  constructor(private apiRoot: ApiRoot, private cart: CartModel) {}

  public async createAnonymousUser(): Promise<ClientResponse<Project>> {
    const responce: ClientResponse<Project> = await this.apiRoot.getApiRoot({ type: ApiRootType.ANONYM }).get().execute();
    if (!responce.tokenStore) {
      throw new Error(APIErrors.TOKEN_STORE_MISSED);
    }
    // await this.cart.createCart(responce.tokenStore);
    return responce;
  }

  public async createUser(anonymTokenStore: TokenStore, params: UserCredentials): Promise<ClientResponse<CustomerSignInResult>> {
    // TODO create cart
    const user: UserAuthOptions = { username: params.email, password: params.password };
    const responce: ClientResponse<CustomerSignInResult> = await this.apiRoot
      .getApiRoot({ type: ApiRootType.USER, user, tokenStore: anonymTokenStore })
      .customers()
      .post({ body: omitUndefinedProps(params) })
      .execute();
    // TODO create cart
    console.log(anonymTokenStore.token === responce.tokenStore?.token);
    if (!responce.tokenStore) {
      throw new Error(APIErrors.TOKEN_STORE_MISSED);
    }
    // await this.cart.createCart(responce.tokenStore);
    return responce;
  }

  public async loginUser(anonymTokenStore: TokenStore, user: UserAuthOptions): Promise<ClientResponse<CustomerSignInResult>> {
    const postBody = { body: { email: user.username, password: user.password, activeCartSignInMode: 'MergeWithExistingCustomerCart' } };
    const responce: ClientResponse<CustomerSignInResult> = await this.apiRoot
      .getApiRoot({ type: ApiRootType.USER, user, tokenStore: anonymTokenStore })
      .me()
      .login()
      .post(postBody)
      .execute();
    if (!responce.tokenStore) {
      throw new Error(APIErrors.TOKEN_STORE_MISSED);
    }
    return responce;
  }

  public async logoutUser(): Promise<ClientResponse<Project>> {
    return this.createAnonymousUser();
  }

  public async getUserByEmail(tokenStore: TokenStore, email: string): Promise<CustomerPagedQueryResponse> {
    const getBody = { queryArgs: { where: `email="${email}"` } };
    const responce = await this.apiRoot.getApiRoot({ tokenStore }).customers().get(getBody).execute();
    return responce.body;
  }

  public async getLoggedUser(tokenStore: TokenStore): Promise<ClientResponse<Customer>> {
    return this.apiRoot.getApiRoot({ tokenStore }).me().get().execute();
  }

  public async updateLoggedUserData(tokenStore: TokenStore, body: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    return this.apiRoot.getApiRoot({ tokenStore }).me().post({ body }).execute();
  }

  // public async restoreLoggedUser(token: string, refreshToken: string | undefined, expirationTime = EXPIRATION_TIME_SEC): Promise<TokenStore | null> {
  //   if (!token) {
  //     return null;
  //   }
  //   this.apiRoot.getApiRoot({ token, refreshToken, expirationTime });
  //   return this.getLoggedUser()
  //     .then(() => this.apiRoot.getApiRoot())
  //     .catch((error) => {
  //       console.log(error);
  //       // if (error instanceof Error && error.message === APIErrors.USER_INVALID_TOKEN && refreshToken) {
  //       //   return this.apiClient.getApiRootUserRefreshToken().
  //       // }
  //       return null;
  //     });
  // }

  /* async updateUserPassword(body: MyCustomerChangePassword, email: string, newPassword: string): Promise<void> {
    await this.apiClient.getApiRootToken().me().password().post({ body }).execute();
    // TODO Check this part
    await this.logoutUser();
    await this.loginUser(email, newPassword);
  } */

  /*   async loginRefreshUser(): Promise<TokenStore> {
    await this.apiClient
      .getApiRootUserRefreshToken().login().post()
      // .me()
      // .login()
      // .post({
      //   body:{

      //   }
      // })
      // .execute();
    return this.apiClient.getTokenCache();
  } */
}
