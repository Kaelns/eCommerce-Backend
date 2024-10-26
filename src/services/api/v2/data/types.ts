import { ByProjectKeyProductProjectionsSearchRequestBuilder } from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions
} from '@commercetools/sdk-client-v2';

export enum ApiClientType {
  DEFAULT = 'DEFAULT',
  ANONYM = 'ANONYM',
  USER = 'USER',
  TOKEN = 'TOKEN'
}

export interface IAuthMiddlewareOptions {
  [ApiClientType.DEFAULT]: AuthMiddlewareOptions;
  [ApiClientType.ANONYM]: AnonymousAuthMiddlewareOptions;
  [ApiClientType.USER]: PasswordAuthMiddlewareOptions;
  [ApiClientType.TOKEN]: undefined;
}

export type IQueryProductsArgs = NonNullable<
  NonNullable<Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]>['queryArgs']
>;

export interface ICreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: {
    country: string;
    postalCode: string;
    city: string;
    streetName: string;
  }[];
  shippingAddresses: number[];
  billingAddresses?: number[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}

export const isObject = (elem: unknown): elem is {} => {
  return typeof elem === 'object' && elem !== null && !Array.isArray(elem);
};

export const isUserAuthOptions = (user: unknown): user is UserAuthOptions => {
  return isObject(user) && 'username' in user && 'password' in user;
};
