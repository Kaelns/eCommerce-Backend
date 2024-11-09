import { TokenStore } from '@commercetools/sdk-client-v2';
import { ApiClient } from '@/services/api/v2/lib/ApiClient.js';
import { filterUndefinedProperties } from '@/utils/filterUndefinedObjProperties.js';
import { Customer, CustomerPagedQueryResponse, MyCustomerUpdate, ClientResponse, Project, CustomerDraft } from '@commercetools/platform-sdk';

export class UserModel {
  constructor(private apiClient: ApiClient) {}

  public async createAnonymousUser(): Promise<ClientResponse<Project>> {
    return this.apiClient.getAnonymApiRoot().get().execute();
  }

  public async createUser(params: CustomerDraft /* , token: string */): Promise<TokenStore> {
    // TODO check if email already exists
    const oldToken = this.apiClient.getTokenCache().token;
    const responce = await this.apiClient
      .getDefaultApiRoot()
      .customers()
      .post({ body: filterUndefinedProperties(params) })
      .execute();
    // TODO remove log
    console.log('CreateUser result', responce, oldToken, this.apiClient.getTokenCache().token);
    return this.apiClient.getTokenCache();
  }

  public async getUserByEmail(email: string): Promise<ClientResponse<CustomerPagedQueryResponse>> {
    const getBody = { queryArgs: { where: `email="${email}"` } };
    return this.apiClient.getDefaultApiRoot().customers().get(getBody).execute();
  }

  public async loginUser(email: string, password: string): Promise<TokenStore> {
    const postBody = { body: { email, password, activeCartSignInMode: 'MergeWithExistingCustomerCart' } };
    await this.apiClient.getUserApiRoot({ username: email, password }).me().login().post(postBody).execute();
    return this.apiClient.getTokenCache();
  }

  /**
   * Creates anonymous user without creating cart for anonym. Do it by yourself
   */
  public async logoutUser(): Promise<ClientResponse<Project>> {
    return this.createAnonymousUser();
  }

  public async getLoggedUser(): Promise<ClientResponse<Customer>> {
    return this.apiClient.getTokenApiRoot().me().get().execute();
  }

  public async updateLoggedUserData(body: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    return this.apiClient.getTokenApiRoot().me().post({ body }).execute();
  }

  public async restoreLoggedUser(token: string, refreshToken: string | undefined, expirationTime = 172800): Promise<TokenStore | null> {
    if (!token) return null;
    this.apiClient.setTokenCache({ token, refreshToken, expirationTime });
    return this.getLoggedUser()
      .then(() => this.apiClient.getTokenCache())
      .catch((error) => {
        console.log(error);
        // if (error instanceof Error && error.message === APIErrors.USER_INVALID_TOKEN && refreshToken) {
        //   return this.apiClient.getApiRootUserRefreshToken().
        // }
        return null;
      });
  }

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
