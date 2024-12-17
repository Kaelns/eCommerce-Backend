export enum Routes {
  AUTH = '/app',
  USERS = '/app/users',
  PRODUCTS = '/app/products'
}

export enum Cookies {
  ANONYM_ACCESS_TOKEN = 'anonymAccessToken',
  ANONYM_REFRESH_TOKEN = 'anonymRefreshToken'
}

export enum Errors {
  INVALID_TOKEN_STORE = 'Token store is invalid',

  UNDEFINED_USER_DB = 'User from db is undefined'
}
