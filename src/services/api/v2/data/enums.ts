export enum ApiClientType {
  DEFAULT = 'DEFAULT',
  USER = 'USER',
  ANONYM = 'ANONYM',
  TOKEN = 'TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN'
}

export enum APIErrors {
  USER_INVALID_TOKEN = '',
  USER_REFRESH_TOKEN = 'Refresh token not found',
  USER_UPDATE_ERROR = 'Something went wrong during the updating process and that they should try again later.',
  EMAIL_DUPLICATE_ERROR = 'There is already an existing customer with the provided email.',
  REGISTRATION_CONNECTION_ERROR = 'Something went wrong during the registration process and that they should try again later.'
}

export enum Errors {
  MIDDLEWARE_USER_DATA = 'Error: user data is missing',
  MIDDLEWARE_REFRESH_TOKEN = 'Error: refresh token is missing'
}
