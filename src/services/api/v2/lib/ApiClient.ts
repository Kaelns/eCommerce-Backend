import { APIErrors, ApiClientType } from '@/services/api/v2/data/enums.js';
import { CustomTokenCache } from '@/services/api/v2/lib/CustomTokenCache.js';
import { AuthMiddlewareOptionsSelector, isUserAuthOptions } from '@/services/api/v2/data/types.js';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { projectKey, httpMiddlewareOptions, authMiddlewareOptions } from '@/services/api/v2/data/constants.js';
import { TokenStore, UserAuthOptions, ClientBuilder, PasswordAuthMiddlewareOptions, RefreshAuthMiddlewareOptions } from '@commercetools/ts-client';

export class ApiClient {
  private tokenCache: CustomTokenCache;
  private defaultApiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.tokenCache = new CustomTokenCache();
    const clientBuilder = this.getClientBuilder(ApiClientType.DEFAULT).build();
    this.defaultApiRoot = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({ projectKey });
  }

  public getDefaultApiRoot(): ByProjectKeyRequestBuilder {
    return this.defaultApiRoot;
  }

  public getTokenApiRoot(/* tokenStore: TokenStore */): ByProjectKeyRequestBuilder {
    // this.setTokenCache(tokenStore);
    const clientWithToken = this.getClientBuilder(ApiClientType.TOKEN).build();
    return createApiBuilderFromCtpClient(clientWithToken).withProjectKey({ projectKey });
  }

  public getAnonymApiRoot(): ByProjectKeyRequestBuilder {
    const clientAnonym = this.getClientBuilder(ApiClientType.ANONYM).build();
    return createApiBuilderFromCtpClient(clientAnonym).withProjectKey({ projectKey });
  }

  public getUserApiRoot(user: UserAuthOptions): ByProjectKeyRequestBuilder {
    const clientUser = this.getClientBuilder(ApiClientType.USER, user).build();
    return createApiBuilderFromCtpClient(clientUser).withProjectKey({ projectKey });
  }

  private getClientBuilder<T extends ApiClientType>(type: T, user?: T extends ApiClientType.USER ? UserAuthOptions : undefined): ClientBuilder {
    const client = new ClientBuilder().withProjectKey(projectKey).withHttpMiddleware(httpMiddlewareOptions);
    if (process.env.NODE_ENV === 'development') client.withLoggerMiddleware();

    switch (type) {
      case ApiClientType.ANONYM:
        client.withAnonymousSessionFlow(this.getAuthMiddlewareOptions(ApiClientType.ANONYM));
        break;
      case ApiClientType.USER:
        client.withPasswordFlow(this.getAuthMiddlewareOptions(ApiClientType.USER, user));
        break;
      case ApiClientType.REFRESH_TOKEN:
        client.withRefreshTokenFlow(this.getAuthMiddlewareOptions(ApiClientType.REFRESH_TOKEN));
        break;
      case ApiClientType.TOKEN: {
        const authorization = `Bearer ${this.tokenCache.get().token}`;
        const tokenOptions = { force: true };
        client.withExistingTokenFlow(authorization, tokenOptions);
        break;
      }
      default:
        client.withClientCredentialsFlow(this.getAuthMiddlewareOptions(ApiClientType.DEFAULT));
    }
    return client;
  }

  private getAuthMiddlewareOptions<T extends ApiClientType>(
    type: T,
    user?: T extends ApiClientType.USER ? UserAuthOptions : undefined
  ): AuthMiddlewareOptionsSelector[T];
  private getAuthMiddlewareOptions(type: ApiClientType, user?: UserAuthOptions): AuthMiddlewareOptionsSelector[ApiClientType] {
    const newAuthMiddlewareOptions: AuthMiddlewareOptionsSelector[ApiClientType] = {
      ...authMiddlewareOptions,
      credentials: { ...authMiddlewareOptions.credentials }
    };

    if (type !== ApiClientType.DEFAULT && type !== ApiClientType.ANONYM) {
      newAuthMiddlewareOptions.tokenCache = this.tokenCache;
    }

    if (type === ApiClientType.USER && isUserAuthOptions(user)) {
      (newAuthMiddlewareOptions as PasswordAuthMiddlewareOptions).credentials.user = user;
    }

    if (type === ApiClientType.REFRESH_TOKEN) {
      const refreshToken = this.tokenCache.get().refreshToken;
      if (!refreshToken) {
        throw new Error(APIErrors.USER_REFRESH_TOKEN);
      }
      (newAuthMiddlewareOptions as RefreshAuthMiddlewareOptions).refreshToken = refreshToken;
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
