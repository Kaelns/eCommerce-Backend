export enum ApiRootType {
  DEFAULT = 'DEFAULT',
  USER = 'USER',
  ANONYM = 'ANONYM',
  TOKEN = 'TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN'
}

export enum APIErrors {
  USER_INVALID_CREDENTIALS = 'User credentials is invalid',
  USER_UPDATE_ERROR = 'Something went wrong during the updating process and that they should try again later.',

  TOKEN_STORE_INVALID = 'Token store is invalid',
  TOKEN_INVALID = 'The token is invalid',
  TOKEN_INVALID_REFRESH = 'The refresh token is invalid',

  EMAIL_DUPLICATE_ERROR = 'There is already an existing customer with the provided email.',
  REGISTRATION_CONNECTION_ERROR = 'Something went wrong during the registration process and that they should try again later.'
}

export enum Errors {
  MIDDLEWARE_USER_DATA = 'Error: user data is missing',
  MIDDLEWARE_REFRESH_TOKEN = 'Error: refresh token is missing'
}
