import { ClientParamsVariety } from '@/services/api/v2/data/types.js';
import { CustomTokenCache } from '@/services/api/v2/lib/CustomTokenCache.js';
import { ApiRootType, ClientParamsType } from '@/services/api/v2/data/enums.js';
import { projectKey, httpMiddlewareOptions, authMiddlewareOptions } from '@/services/api/v2/data/constants.js';
import {
  Next,
  ClientBuilder,
  MiddlewareRequest,
  AuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions
} from '@commercetools/ts-client';
import { getBaseAuthOptionsCopy } from '@/services/api/v2/utils/getBaseAuthOptionsCopy.js';

export class Client {
  constructor(private tokenCache: CustomTokenCache) {}

  public getClientBuilder<T extends ApiRootType>(
    type: T,
    params?: T extends keyof typeof ClientParamsType ? ClientParamsVariety[T] : undefined
  ): ClientBuilder {
    const [user, refreshToken] = [params?.user, params?.refreshToken];

    const client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withAfterExecutionMiddleware({ middleware: this.setTokensToResponse(this.tokenCache) });

    if (process.env.NODE_ENV === 'development') {
      client.withLoggerMiddleware();
    }

    switch (type) {
      case ApiRootType.ANONYM: {
        const options = getBaseAuthOptionsCopy<AuthMiddlewareOptions>(this.tokenCache);
        client.withAnonymousSessionFlow(options);
        break;
      }
      case ApiRootType.USER: {
        if (user) {
          const options = getBaseAuthOptionsCopy<PasswordAuthMiddlewareOptions>(this.tokenCache);
          options.credentials.user = user;
          client.withPasswordFlow(options);
        }
        break;
      }
      case ApiRootType.REFRESH_TOKEN: {
        if (refreshToken) {
          const options = getBaseAuthOptionsCopy<RefreshAuthMiddlewareOptions>(this.tokenCache);
          options.refreshToken = refreshToken;
          client.withRefreshTokenFlow(options);
        }
        break;
      }
      case ApiRootType.TOKEN: {
        const authorization = `Bearer ${this.tokenCache.get().token}`;
        const tokenOptions = { force: true };
        client.withExistingTokenFlow(authorization, tokenOptions);
        break;
      }
      default:
        client.withClientCredentialsFlow(authMiddlewareOptions);
    }
    return client;
  }

  private setTokensToResponse(tokenCache: CustomTokenCache) {
    return () => {
      return (next: Next): Next => {
        return (req: MiddlewareRequest) => {
          const tokenStore = tokenCache.get();
          if (req.response && tokenStore.token) {
            req.response.tokenStore = { ...tokenStore };
          }
          tokenCache.reset();
          return next(req);
        };
      };
    };
  }
}
