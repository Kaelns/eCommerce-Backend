import { ApiRootType } from '@/services/ecommerce/v3/data/enums.js';
import { CustomTokenCache } from '@/services/ecommerce/v3/lib/CustomTokenCache.js';
import { ENV_CTS_PROJECT_KEY, IS_PRODUCTION } from '@/shared/config/envConfig.js';
import { getBaseAuthOptionsCopy } from '@/services/ecommerce/v3/utils/getBaseAuthOptionsCopy.js';
import { HTTP_MIDDLEWARE_OPTIONS } from '@/services/ecommerce/v3/data/constants.js';
import {
  Next,
  ClientBuilder,
  MiddlewareRequest,
  MiddlewareResponse,
  AuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions
} from '@commercetools/ts-client';
import { ClientParams } from '@/services/ecommerce/v3/data/types.js';
import chalk from 'chalk';
import { isOkStatusCode } from '@/utils/isOkStatusCode.js';

export class Client {
  constructor(private tokenCache: CustomTokenCache) {}

  public getClientBuilder({ type, tokenStore, user }: ClientParams): ClientBuilder {
    if (tokenStore && tokenStore.token) {
      this.tokenCache.set(tokenStore);
    }

    const client = new ClientBuilder()
      .withProjectKey(ENV_CTS_PROJECT_KEY)
      .withHttpMiddleware(HTTP_MIDDLEWARE_OPTIONS)
      .withAfterExecutionMiddleware({ middleware: this.setTokensToResponse(this.tokenCache) });

    if (!IS_PRODUCTION) {
      client.withLoggerMiddleware({ loggerFn: this.loggerFn });
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
        const refreshToken = tokenStore.refreshToken;
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
      default: {
        const options = getBaseAuthOptionsCopy<AuthMiddlewareOptions>(this.tokenCache);
        client.withClientCredentialsFlow(options);
      }
    }
    return client;
  }

  private setTokensToResponse(tokenCache: CustomTokenCache) {
    return () => {
      return (next: Next): Next => {
        return (req: MiddlewareRequest) => {
          const tokenStore = tokenCache.get();
          if (req.response) {
            req.response.tokenStore = { ...tokenStore };
          }
          tokenCache.reset();
          return next(req);
        };
      };
    };
  }

  private loggerFn(response: MiddlewareResponse) {
    const isOk = isOkStatusCode(response.statusCode);
    const responceMsg = isOk ? chalk.bgGreen('Response is: ') : chalk.bgRed('Response is: ');

    console.log(chalk.bgBlueBright('Request is: '), chalk.bgGray(response.originalRequest?.uri), '\n', response.originalRequest);
    console.log('\n');
    console.log(responceMsg, response);
    console.log('\n');
  }
}
