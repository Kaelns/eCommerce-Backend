// TODO handle potential errors

import { projectKey, httpMiddlewareOptions, authMiddlewareOptions } from '@/services/api/v2/data/constants';
import { ApiClientType, IAuthMiddlewareOptions, isUserAuthOptions } from '@/services/api/v2/data/types';
import { CustomTokenCache } from '@/services/api/v2/lib/CustomTokenCache';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  UserAuthOptions,
  ClientBuilder,
  TokenStore,
  PasswordAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2';

export class ApiClient {
  private tokenCache: CustomTokenCache;
  private apiRootName: ApiClientType = ApiClientType.DEFAULT;
  private defaultApiRoot: ByProjectKeyRequestBuilder;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.tokenCache = new CustomTokenCache();
    const clientBuilder = this.getClientBuilder(ApiClientType.DEFAULT).build();
    this.defaultApiRoot = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({ projectKey });
    this.apiRoot = this.defaultApiRoot;
  }

  public getDefaultApiRoot(): ByProjectKeyRequestBuilder {
    return this.defaultApiRoot;
  }

  public getApiRoot(type: ApiClientType = ApiClientType.DEFAULT): ByProjectKeyRequestBuilder {
    switch (type) {
      case ApiClientType.USER:
        if (this.apiRootName !== ApiClientType.USER) {
          this.buildTokenClient();
        }
        break;
      case ApiClientType.TOKEN:
        if (this.apiRootName !== ApiClientType.USER && this.apiRootName !== ApiClientType.TOKEN) {
          this.buildTokenClient();
        }
        break;
      default:
    }

    return this.apiRoot;
  }

  public buildAnonymClient(): ApiClient {
    if (this.apiRootName !== ApiClientType.ANONYM) {
      const clientAnonym = this.getClientBuilder(ApiClientType.ANONYM).build();
      this.apiRoot = createApiBuilderFromCtpClient(clientAnonym).withProjectKey({
        projectKey
      });
      this.apiRootName = ApiClientType.ANONYM;
    }
    return this;
  }

  public buildUserClient(user: UserAuthOptions): ApiClient {
    if (isUserAuthOptions(user)) {
      const clientUser = this.getClientBuilder(ApiClientType.USER, user).build();
      this.apiRoot = createApiBuilderFromCtpClient(clientUser).withProjectKey({
        projectKey
      });
      this.apiRootName = ApiClientType.USER;
    }
    return this;
  }

  // TODO Check token problem
  public buildTokenClient(): ApiClient {
    if (this.apiRootName !== ApiClientType.TOKEN) {
      const clientWithToken = this.getClientBuilder(ApiClientType.TOKEN).build();
      this.apiRoot = createApiBuilderFromCtpClient(clientWithToken).withProjectKey({
        projectKey
      });
      this.apiRootName = ApiClientType.TOKEN;
    }
    return this;
  }

  private getClientBuilder<T extends ApiClientType>(
    type: T,
    user?: T extends ApiClientType.USER ? UserAuthOptions : undefined
  ): ClientBuilder {
    const client = new ClientBuilder().withProjectKey(projectKey).withHttpMiddleware(httpMiddlewareOptions);
    if (process.env.NODE_ENV === 'development') client.withLoggerMiddleware();

    switch (type) {
      case ApiClientType.ANONYM:
        client.withAnonymousSessionFlow(this.getAuthMiddlewareOptions(ApiClientType.ANONYM));
        break;
      case ApiClientType.USER:
        client.withPasswordFlow(this.getAuthMiddlewareOptions(ApiClientType.USER, user));
        break;
      case ApiClientType.TOKEN:
        const authorization = `Bearer ${this.tokenCache.get().token}`;
        const tokenOptions = { force: true };
        client.withExistingTokenFlow(authorization, tokenOptions);
        break;
      default:
        client.withClientCredentialsFlow(this.getAuthMiddlewareOptions(ApiClientType.DEFAULT));
    }
    return client;
  }

  private getAuthMiddlewareOptions<T extends ApiClientType>(
    type: T,
    user?: T extends ApiClientType.USER ? UserAuthOptions : undefined
  ): IAuthMiddlewareOptions[T];
  private getAuthMiddlewareOptions(type: ApiClientType, user?: UserAuthOptions): IAuthMiddlewareOptions[ApiClientType] {
    const newAuthMiddlewareOptions: IAuthMiddlewareOptions[ApiClientType] = {
      ...authMiddlewareOptions,
      credentials: { ...authMiddlewareOptions.credentials },
      tokenCache: this.tokenCache
    };

    if (type === ApiClientType.USER && isUserAuthOptions(user)) {
      (newAuthMiddlewareOptions as PasswordAuthMiddlewareOptions).credentials.user = user;
    }
    return newAuthMiddlewareOptions;
  }

  public getTokenCache(): Readonly<TokenStore> {
    return this.tokenCache.get();
  }

  public setTokenCache(tokenStore: TokenStore): void {
    this.tokenCache.set(tokenStore);
  }
}

export const apiClient = new ApiClient();
