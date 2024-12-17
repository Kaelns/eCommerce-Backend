import { TokenStore, UserAuthOptions } from '@commercetools/ts-client';

export const isObject = (elem: unknown): elem is object => {
  return typeof elem === 'object' && elem !== null && !Array.isArray(elem);
};

export const isUserAuthOptions = (user: unknown): user is UserAuthOptions => {
  return isObject(user) && 'username' in user && 'password' in user;
};

export const isEnumsValue = <T extends { [k: string]: string }>(type: unknown, enumObj: T): type is T[keyof T] => {
  return typeof type === 'string' && Object.values(enumObj).includes(type);
};

export const isValidTokenStore = (tokenStore: TokenStore | undefined): tokenStore is TokenStore => {
  return !!tokenStore && !!tokenStore.token;
};
