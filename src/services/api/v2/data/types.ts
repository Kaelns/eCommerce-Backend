import { ApiRootType } from '@/services/api/v2/data/enums.js';
import { ByProjectKeyProductProjectionsSearchRequestBuilder, ClientResponse } from '@commercetools/platform-sdk';
import {
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  UserAuthOptions,
  AuthMiddlewareOptions,
  TokenStore
} from '@commercetools/ts-client';

export type ResponseWithTokens<T> = [T, TokenStore];
export type AuthMiddlewareOptionsUnion = AuthMiddlewareOptions | PasswordAuthMiddlewareOptions | RefreshAuthMiddlewareOptions;
export type ClientResponseTokens = ClientResponse & { tokenStore?: TokenStore };
export type QueryProductsArgs = NonNullable<NonNullable<Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]>['queryArgs']>;

interface Address {
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  apartment?: string | undefined;
}

export interface UserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses?: number[] | undefined;
  defaultBillingAddress?: number | undefined;
  defaultShippingAddress?: number | undefined;
}

export interface ClientParamsVariety {
  [ApiRootType.DEFAULT]: undefined;
  [ApiRootType.USER]: { user: UserAuthOptions; tokenStore: TokenStore };
  [ApiRootType.ANONYM]: { user?: UserAuthOptions; tokenStore: TokenStore };
  [ApiRootType.ANONYM]: { user?: UserAuthOptions; tokenStore: TokenStore };
}

export type ApiRootParams =
  | {
      type?: ApiRootType.TOKEN;
      tokenStore: TokenStore;
      user?: undefined;
    }
  | {
      type: ApiRootType.REFRESH_TOKEN;
      tokenStore: TokenStore;
      user?: undefined;
    }
  | {
      type: ApiRootType.USER;
      tokenStore: TokenStore;
      user: UserAuthOptions;
    }
  | {
      type: ApiRootType.ANONYM;
      tokenStore?: TokenStore;
      user?: undefined;
    };

export type ClientParams =
  | {
      type: ApiRootType.TOKEN | ApiRootType.REFRESH_TOKEN;
      tokenStore: TokenStore;
      user?: undefined;
    }
  | {
      type: ApiRootType.DEFAULT | ApiRootType.ANONYM;
      tokenStore?: undefined | TokenStore;
      user?: undefined;
    }
  | {
      type: ApiRootType.USER;
      tokenStore: TokenStore;
      user: UserAuthOptions;
    };
