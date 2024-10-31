import { ApiClientType } from '@/services/api/v2/data/enums.js';
import { ICreateUserParams } from '@/services/api/v2/data/types.js';
import { ApiClient } from '@/services/api/v2/lib/ApiClient.js';
import { filterUndefinedProperties } from '@/utils/filterUndefinedObjProperties.js';
import { Customer, CustomerPagedQueryResponse, MyCustomerUpdate, ClientResponse, Project } from '@commercetools/platform-sdk';
import { TokenStore } from '@commercetools/sdk-client-v2';

export class UserModel {
  constructor(private apiClient: ApiClient) {}

  public async createAnonymousUser(): Promise<ClientResponse<Project>> {
    return this.apiClient.buildAnonymClient().getApiRoot().get().execute();
  }

  public async createUser(params: ICreateUserParams /* , token: string */): Promise<TokenStore> {
    const customerData: ICreateUserParams = filterUndefinedProperties(params);
    const oldToken = this.apiClient.getTokenCache().token;
    const responce = await this.apiClient.getApiRoot().customers().post({ body: customerData }).execute();
    // TODO remove log
    console.log('CreateUser result', responce, oldToken, this.apiClient.getTokenCache().token);
    return this.apiClient.getTokenCache();
  }

  public async getUserByEmail(customerEmail: string): Promise<ClientResponse<CustomerPagedQueryResponse>> {
    const getBody = { queryArgs: { where: `email="${customerEmail}"` } };
    return this.apiClient.getApiRoot().customers().get(getBody).execute();
  }

  public async loginUser(email: string, password: string): Promise<TokenStore> {
    const postBody = { body: { email, password, activeCartSignInMode: 'MergeWithExistingCustomerCart' } };
    const credentials = { username: email, password };
    await this.apiClient.buildUserClient(credentials).getApiRoot().me().login().post(postBody).execute();
    return this.apiClient.getTokenCache();
  }

  /**
   * Creates anonymous user without creating cart for anonym. Do it by yourself
   */
  public async logoutUser(): Promise<ClientResponse<Project>> {
    return this.createAnonymousUser();
  }

  public async restoreLoggedUser(token: string, refreshToken: string | undefined, expirationTime = 7000): Promise<TokenStore | null> {
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

  public async getLoggedUser(): Promise<ClientResponse<Customer>> {
    // TODO token or just getApiRoot
    return this.apiClient.getApiRoot(ApiClientType.USER).me().get().execute();
  }

  public async updateLoggedUserData(body: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    return this.apiClient.getApiRoot(ApiClientType.USER).me().post({ body }).execute();
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
