import { ApiRootType, ClientParamsType } from '@/services/api/v2/data/enums.js';
import { ByProjectKeyProductProjectionsSearchRequestBuilder, ClientResponse } from '@commercetools/platform-sdk';
import {
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  UserAuthOptions,
  AuthMiddlewareOptions,
  TokenStore
} from '@commercetools/ts-client';

export type AuthMiddlewareOptionsUnion = AuthMiddlewareOptions | PasswordAuthMiddlewareOptions | RefreshAuthMiddlewareOptions;
export type ClientResponseTokens = ClientResponse & { tokenStore?: TokenStore };
export type QueryProductsArgs = NonNullable<NonNullable<Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]>['queryArgs']>;

export interface ClientParams {
  user?: UserAuthOptions;
  refreshToken?: string;
}
export interface ClientParamsVariety {
  [ClientParamsType.ANONYM]: ClientParams;
  [ClientParamsType.USER]: { user: UserAuthOptions; refreshToken?: string };
  [ClientParamsType.REFRESH_TOKEN]: { user?: UserAuthOptions; refreshToken: string };
}

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

export type ApiRootParams =
  | {
      type?: ApiRootType.TOKEN;
      tokenStore: TokenStore;
      user?: undefined;
    }
  | {
      type: ApiRootType.TOKEN | ApiRootType.REFRESH_TOKEN;
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
      tokenStore?: undefined;
      user?: undefined;
    };
